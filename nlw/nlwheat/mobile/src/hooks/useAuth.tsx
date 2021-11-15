import React, { createContext, useContext, useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../services/api';
const CLIENT_ID = '2605058bae54dae53983';
const SCOPE = 'read:user';
const USER_STORAGE = 'nlwheat:user';
const TOKEN_STORAGE = 'nlwheat:token';

interface IAuthProvider {
  children: React.ReactNode;
}

interface IUser {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

interface IAuthContext {
  user: IUser | null;
  isSignIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthResponse {
  token: string;
  user: IUser;
}

interface AuthorizationResponse {
  params: {
    code?: string;
    error?: string;
  };
  type?: string;
}

const AuthContext = createContext({} as IAuthContext);

function AuthProvider({ children }: IAuthProvider) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isSignIn, setIsSignIn] = useState(true);

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;

  async function signIn() {
    try {
      setIsSignIn(true);
      const authSessionResponse = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (
        authSessionResponse.type === 'success' &&
        authSessionResponse.params.error !== 'access_denied'
      ) {
        const authResponse = await api.post('/authenticate', {
          code: authSessionResponse.params.code,
        });

        const { user, token } = authResponse.data as AuthResponse;
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
        await AsyncStorage.setItem(TOKEN_STORAGE, token);
        setUser(user);
      }
    } catch (err) {
    } finally {
      setIsSignIn(false);
    }
  }

  async function signOut() {
    setUser(null);
    const userStorage = await AsyncStorage.removeItem(USER_STORAGE);
    const tokenStorage = await AsyncStorage.removeItem(TOKEN_STORAGE);
  }

  useEffect(() => {
    (async () => {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE);
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);
      if (userStorage && tokenStorage) {
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`;
        setUser(JSON.parse(userStorage));
      }
      setIsSignIn(false);
    })();
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user, isSignIn, signIn, signOut }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
