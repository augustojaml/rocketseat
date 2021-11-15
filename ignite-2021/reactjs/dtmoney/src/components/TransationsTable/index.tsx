import { formattedCurrency, formattedDate } from '../../support/hellpers';
import { useTransactions } from '../../hooks/useTransactions';
import { Container } from './styled';

export function TransactionTable() {
  const { transactions } = useTransactions();
  console.log(transactions);

  return (
    <>
      <Container>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Valor</th>
              <th>Categoria</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  {formattedCurrency(transaction.amount)}
                </td>
                <td>{transaction.category}</td>
                <td>{formattedDate(transaction.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </>
  );
}
