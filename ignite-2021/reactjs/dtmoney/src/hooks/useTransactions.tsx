import { AxiosResponse } from 'axios';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsProps {
  id: string;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

//type TransactionInputType = Omit<TransactionsProps, 'id' | 'createdAt'>;
// type TransactionInputType = Pick<
//   TransactionsProps,
//   'title' | 'amount' | 'type' | 'category'
// >;

interface TransactionInput {
  title: string;
  type: string;
  category: string;
  amount: number;
}

interface TransactionResponse {
  transaction: TransactionsProps;
}

interface TransactionsData {
  transactions: TransactionsProps[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext({} as TransactionsData);

function TransactionProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post<TransactionResponse>('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;
    setTransactions([...transactions, transaction]);
  }

  useEffect(() => {
    (async () => {
      const response: AxiosResponse<any> = await api.get('transactions');
      setTransactions(response.data.transactions);
    })();
  }, []);

  return (
    <>
      <TransactionsContext.Provider value={{ transactions, createTransaction }}>
        {children}
      </TransactionsContext.Provider>
    </>
  );
}

function useTransactions() {
  return useContext(TransactionsContext);
}

export { TransactionProvider, useTransactions };
