import { useTheme } from './hooks/useTheme';
import { Header } from './components/Header';
import { GlobalStyle } from './global/styles/globals';
import { ThemeProvider } from 'styled-components';
import { Dashboard } from './components/dashboard';
import Modal from 'react-modal';
import { useState } from 'react';
import { NewTransactionModal } from './components/TransationsTable/NewTransactionModal';
import { TransactionProvider } from './hooks/useTransactions';

Modal.setAppElement('#root');

export function App() {
  const { theme } = useTheme();

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <>
      <TransactionProvider>
        <ThemeProvider theme={theme}>
          <Header
            handleOpenNewTransactionModal={handleOpenNewTransactionModal}
          />
          <Dashboard />
          <NewTransactionModal
            isOpen={isNewTransactionModalOpen}
            onRequestClose={handleCloseNewTransactionModal}
          />
          <GlobalStyle />
        </ThemeProvider>
      </TransactionProvider>
    </>
  );
}
