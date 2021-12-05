import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { database } from '../database';
import { User as UserModel } from '../database/model/User';
import { api } from '../services/api';

interface IUser {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: IUser;
  signIn: ({ email, password }: ISignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: IUser) => Promise<void>;
  isLoading: boolean;
}

interface IAuthProvider {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

function AuthProvider({ children }: IAuthProvider) {
  const [data, setData] = useState<IUser>({} as IUser);
  const [isLoading, setIsLoading] = useState(true);

  async function signIn({ email, password }: ISignInCredentials) {
    try {
      const { data } = await api.post('/sessions', {
        email: email,
        password: password,
      });

      const { token, user } = data;

      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      const userCollection = database.get<UserModel>('users');

      await database.write(async () => {
        await userCollection.create((newUser) => {
          newUser.user_id = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.driver_license = user.driver_license;
          newUser.avatar = user.avatar;
          newUser.token = user.token;
        });
      });

      setData({
        ...user,
        token,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signOut() {
    try {
      const userCollection = database.get<UserModel>('users');
      await database.write(async () => {
        const userSelected = userCollection.find(data.id);
        await (await userSelected).destroyPermanently();
      });

      setData({} as IUser);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function updateUser(user: IUser) {
    try {
      const userCollection = database.get<UserModel>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(user.id);
        await userSelected.update((userData) => {
          (userData.name = user.name), (userData.driver_license = user.driver_license), (userData.avatar = user.avatar);
        });
      });

      setData(user);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    (async () => {
      const userCollection = database.get<UserModel>('users');
      const response = await userCollection.query().fetch();
      if (response.length > 0) {
        const userData = response[0]._raw as unknown as IUser;
        api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
        setData(userData);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user: data, signIn, signOut, updateUser, isLoading }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
