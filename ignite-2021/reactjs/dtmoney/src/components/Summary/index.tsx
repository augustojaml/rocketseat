import { inComeImg, outComeImg, totalImg } from '../../global/images';
import { useTransactions } from '../../hooks/useTransactions';
import { formattedCurrency } from '../../support/hellpers';
import { Container } from './styled';

interface AccumulationProps {
  deposits: number;
  withdraws: number;
  total: number;
}

interface TransactionProps {
  type: string;
  amount: number;
}

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (acc: AccumulationProps, transaction: TransactionProps) => {
      if (transaction.type === 'deposit') {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.withdraws += transaction.amount;
        acc.total -= transaction.amount;
      }
      return acc;
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );

  return (
    <>
      <Container>
        <div>
          <header>
            <p>Entradas</p>
            <img src={inComeImg} alt="Entradas" />
          </header>
          <strong>{formattedCurrency(summary.deposits)}</strong>
        </div>

        <div>
          <header>
            <p>Saídas</p>
            <img src={outComeImg} alt="Saidas" />
          </header>
          <strong>{formattedCurrency(summary.withdraws)}</strong>
        </div>

        <div className="highlight-background">
          <header>
            <p>Total</p>
            <img src={totalImg} alt="Total" />
          </header>
          <strong>{formattedCurrency(summary.total)}</strong>
        </div>
      </Container>
    </>
  );
}
