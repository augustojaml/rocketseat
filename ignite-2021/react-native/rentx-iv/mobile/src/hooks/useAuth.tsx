import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
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
}

interface IAuthProvider {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

function AuthProvider({ children }: IAuthProvider) {
  const [data, setData] = useState<IUser>({} as IUser);

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

  useEffect(() => {
    (async () => {
      const userCollection = database.get<UserModel>('users');
      const response = await userCollection.query().fetch();
      if (response.length > 0) {
        const userData = response[0]._raw as unknown as IUser;
        api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${userData.token}`;
        setData(userData);
      }
    })();
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user: data, signIn }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
