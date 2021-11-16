import React, { createContext, ReactNode, useContext } from 'react';

interface IAuthProvider {
  children: ReactNode;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface IAuthContext {
  user: IUser;
}

const AuthContext = createContext({} as IAuthContext);

function AuthProvider({ children }: IAuthProvider) {
  const user = {
    id: '1',
    name: 'Augusto Monteiro',
    email: 'jamonteirolima@gmail.com',
    avatar: 'https://github.com/augustojaml',
  };

  return (
    <>
      <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    </>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
