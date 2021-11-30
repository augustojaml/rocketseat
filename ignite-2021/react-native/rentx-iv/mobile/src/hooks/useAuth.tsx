import React, { createContext, ReactNode, useContext, useState } from 'react';
import { api } from '../services/api';

interface IUser {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
}

interface IAuthState {
  token: string;
  user: IUser;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: IUser;
  signIn: ({ email, password }: ISignInCredentials) => Promise<void>;
}

interface IAuthProvider {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

function AuthProvider({ children }: IAuthProvider) {
  const [data, setData] = useState<IAuthState>({} as IAuthState);

  async function signIn({ email, password }: ISignInCredentials) {
    const response = await api.post('/sessions', {
      email: email,
      password: password,
    });

    api.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${response.data.token}`;

    setData({
      user: response.data.user,
      token: response.data.token,
    });
  }

  return (
    <>
      <AuthContext.Provider value={{ user: data.user, signIn }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
