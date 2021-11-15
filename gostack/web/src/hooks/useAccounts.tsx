import { useRouter } from 'next/router';
import {
  ChangeEvent,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Cookies from 'js-cookie';
import { api } from '../services/api';
import { StorageToken } from '../_support/StorageToken';

interface IAccountsProvider {
  children: ReactNode;
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface ISignInAccount {
  email: string;
  password: string;
}

interface ISignUpAccount {
  name: string;
  email: string;
  password: string;
  isHairdresser: boolean;
}

interface IForgotAccount {
  email: string;
}

interface IRecoverAccount {
  token: string;
  old_password: string;
  new_password: string;
  confirm_password: string;
}

interface IResetAccount {
  user_id: string;
  old_password: string;
  new_password: string;
  confirm_password: string;
}

interface IAccountsContext {
  user: IUserResponse;
  signIn(data: ISignInAccount): Promise<void>;
  signOut: () => void;
  signUp(data: ISignUpAccount): Promise<void>;
  forgot(data: IForgotAccount): Promise<void>;
  recoverPassword(data: IRecoverAccount, token: string): Promise<void>;
  updateAvatar(e: ChangeEvent<HTMLInputElement>): Promise<string>;
  resetPassword(data: IResetAccount): Promise<void>;
}

const AccountsContext = createContext<IAccountsContext>({} as IAccountsContext);

function AccountsProvider({ children }: IAccountsProvider) {
  const [user, setUser] = useState<IUserResponse>();
  const router = useRouter();

  const signIn = useCallback(async (data: ISignInAccount) => {
    try {
      const response = await api.post('accounts/authenticate', data);
      const { user: userResponse, token } = response.data;
      Cookies.set(StorageToken.value, token);
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      setUser(userResponse);
    } catch (err) {
      throw err;
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    Cookies.remove(StorageToken.value);
    router.push('../accounts/signin');
  }, [router]);

  const signUp = useCallback(async (data: ISignUpAccount) => {
    try {
      await api.post('accounts', data);
    } catch (err) {
      throw err;
    }
  }, []);

  const forgot = useCallback(async (data: IForgotAccount) => {
    try {
      await api.post('accounts/forgot', data);
    } catch (err) {
      throw err;
    }
  }, []);

  const recoverPassword = useCallback(
    async (data: IRecoverAccount, token: string) => {
      try {
        await api.post('accounts/recover', data, {
          params: {
            token,
          },
        });
      } catch (err) {
        throw err;
      }
    },
    [],
  );

  const updateAvatar = useCallback(
    async (e: ChangeEvent<HTMLInputElement>): Promise<string> => {
      try {
        const data = new FormData();
        data.append('avatar', e.target.files[0]);
        const response = await api.patch('accounts/avatar', data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    [],
  );

  const resetPassword = useCallback(async (data: IResetAccount) => {
    try {
      await api.post('accounts/reset', data);
    } catch (err) {
      throw err;
    }
  }, []);

  useEffect(() => {
    const token = Cookies.get(StorageToken.value);
    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      (async () => {
        try {
          const response = await api.get<IUserResponse>('accounts/profile');
          setUser(response.data);
        } catch (err) {
          router.push('../accounts/signin');
          Cookies.remove(StorageToken.value);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AccountsContext.Provider
        value={{
          user,
          signIn,
          signOut,
          signUp,
          forgot,
          recoverPassword,
          updateAvatar,
          resetPassword,
        }}
      >
        {children}
      </AccountsContext.Provider>
    </>
  );
}

function useAccounts() {
  return useContext(AccountsContext);
}

export { AccountsProvider, useAccounts };
