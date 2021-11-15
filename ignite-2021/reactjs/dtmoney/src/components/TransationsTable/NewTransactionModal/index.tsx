import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { useTheme } from 'styled-components';
import { exitImg, inComeImg, outComeImg } from '../../../global/images';
import { useTransactions } from '../../../hooks/useTransactions';
import { Container, TransactionTypeContainer, RadioBox } from './styled';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const theme = useTheme();
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title: title,
      amount: amount,
      category: category,
      type: type,
    });

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');

    onRequestClose();
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button type="button" className="react-modal-close">
          <img src={exitImg} alt="Fechar modal" onClick={onRequestClose} />
        </button>
        <Container onSubmit={handleCreateNewTransaction}>
          <h2>Cadastrar Transação</h2>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            type="number"
            placeholder="Valor"
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))}
          />

          <TransactionTypeContainer>
            <RadioBox
              type="button"
              onClick={() => setType('deposit')}
              isActive={type === 'deposit'}
              activeColor={theme.colors.green}
            >
              <img src={inComeImg} alt="Entrada" />
              <span>Entrada</span>
            </RadioBox>
            <RadioBox
              type="button"
              onClick={() => setType('withdraw')}
              isActive={type === 'withdraw'}
              activeColor={theme.colors.red}
            >
              <img src={outComeImg} alt="Saida" />
              <span>Saída</span>
            </RadioBox>
          </TransactionTypeContainer>

          <input
            type="text"
            placeholder="Categoria"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
          <button type="submit">Cadastrar</button>
        </Container>
      </Modal>
    </>
  );
}
