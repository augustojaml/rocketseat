import React, { ReactNode } from 'react';

import { AuthProvider } from './useAuth';

interface IAppProvider {
  children: ReactNode;
}

function AppProvider({ children }: IAppProvider) {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}

export { AppProvider };
