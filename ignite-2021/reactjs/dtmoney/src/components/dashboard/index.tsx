import { Summary } from '../Summary';
import { TransactionTable } from '../TransationsTable';
import { Container } from './styled';

export function Dashboard() {
  return (
    <>
      <Container>
        <Summary />
        <TransactionTable />
      </Container>
    </>
  );
}
