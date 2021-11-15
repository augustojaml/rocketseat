import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { AccountsProvider } from '../hooks/useAccounts';
import { GlobalStyled } from './styled';
import { useCustomTheme } from './useCustomTheme';

import 'react-toastify/dist/ReactToastify.css';
import { AppointmentsProvider } from '../hooks/useAppointments';

interface IGlobalComponentProps {
  children: ReactNode;
}

export function GlobalComponent({ children }: IGlobalComponentProps) {
  const { customTheme } = useCustomTheme();
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <AccountsProvider>
          <AppointmentsProvider>
            {children}
            <ToastContainer pauseOnFocusLoss={false} />
          </AppointmentsProvider>
        </AccountsProvider>
        <GlobalStyled />
      </ThemeProvider>
    </>
  );
}
