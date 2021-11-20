import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface IAuthProvider {
  children: ReactNode;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface IAuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

interface IAuthContext {
  user: IUser;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signIOut: () => Promise<void>;
  userStorageLoading: boolean;
}

const AuthContext = createContext({} as IAuthContext);

function AuthProvider({ children }: IAuthProvider) {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as IAuthorizationResponse;

      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
        );
        const userInfo = await response.json();

        const userLogged = {
          id: String(userInfo.id),
          name: userInfo.given_name,
          email: userInfo.email,
          avatar: userInfo.picture,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(
          '@gofinances:user',
          JSON.stringify(userLogged),
        );
      }
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new Error(err as any);
    }
  }

  async function signInWithApple() {
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (credentials) {
        const userLogged = {
          id: String(credentials.user),
          name: credentials.fullName?.givenName,
          email: credentials.email,
          avatar: undefined,
        };
        await AsyncStorage.setItem(
          '@gofinances:user',
          JSON.stringify(userLogged),
        );
      }
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new Error(err as any);
    }
  }

  async function signIOut() {
    setUser({} as IUser);
    await AsyncStorage.removeItem('@gofinances:user');
  }

  useEffect(() => {
    (async () => {
      const storageUser = await AsyncStorage.getItem('@gofinances:user');
      if (storageUser) {
        setUser(JSON.parse(storageUser) as IUser);
      }
      setUserStorageLoading(false);
    })();
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          signInWithGoogle,
          signInWithApple,
          signIOut,
          userStorageLoading,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
