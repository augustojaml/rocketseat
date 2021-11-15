import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';

interface IAuthProviderProps {
  children: ReactNode;
}

interface IUser {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

interface IAuthContextData {
  user: IUser | null;
  signInURL: string;
  signOut: () => void;
}

interface ILoginBoxResponse {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);

  const localStorageToken = '@dowhile:token';

  const signInURL = `https://github.com/login/oauth/authorize?scope=user&client_id=6a50dbdfc1efde63b51f`;

  async function signIn(githubCode: string) {
    const response = await api.post<ILoginBoxResponse>('authenticate', {
      code: githubCode,
    });
    const { user, token } = response.data;
    localStorage.setItem(localStorageToken, token);
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    setUser(user);
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem(localStorageToken);
  }

  useEffect(() => {
    const token = localStorage.getItem(localStorageToken);
    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      (async () => {
        const response = await api.get<IUser>('profile');
        setUser(response.data);
      })();
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');
    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');
      window.history.pushState({}, '', urlWithoutCode);
      signIn(githubCode);
    }
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user, signInURL, signOut }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
