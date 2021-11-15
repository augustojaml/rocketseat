import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import * as YUP from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { InputForm } from '../../components/Forms/InputForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import {
  Container,
  Header,
  Form,
  Title,
  Fields,
  TransactionsTypes,
} from './styled';
import { StorageKeys } from '../../utils/StorageKeys';

interface IRegisterData {
  name: string;
  amount: string;
}

const schema = YUP.object().shape({
  name: YUP.string().required('Nome é obrigatório'),
  amount: YUP.number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('Nome é obrigatório'),
});

export function Register() {
  const navigation = useNavigation();

  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionsTypes(type: 'positive' | 'negative') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: IRegisterData) {
    if (!transactionType) {
      Alert.alert('Selecione o tipo da transação');
    }

    if (category.key === 'category') {
      Alert.alert('Selecione uma categoria');
    }

    const newData = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const getStorageData = await AsyncStorage.getItem(
        StorageKeys.transaction,
      );
      const currentData = getStorageData ? JSON.parse(getStorageData) : [];
      const joinData = [...currentData, newData];
      await AsyncStorage.setItem(
        StorageKeys.transaction,
        JSON.stringify(joinData),
      );

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
      });
      navigation.navigate('Listagem');
    } catch (err) {
      Alert.alert('Não foi possível salvar');
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <Title>Cadastro</Title>
          </Header>
          <Form>
            <Fields>
              <InputForm
                control={control}
                name="name"
                placeholder="Nome"
                autoCapitalize="sentences"
                autoCorrect={false}
                error={errors.name && errors.name.message}
              />
              <InputForm
                control={control}
                name="amount"
                placeholder="Preço"
                keyboardType="numeric"
                error={errors.amount && errors.amount.message}
              />
              <TransactionsTypes>
                <TransactionTypeButton
                  onPress={() => handleTransactionsTypes('positive')}
                  type="up"
                  title="income"
                  isActive={transactionType === 'positive'}
                />
                <TransactionTypeButton
                  onPress={() => handleTransactionsTypes('negative')}
                  type="down"
                  title="outcome"
                  isActive={transactionType === 'negative'}
                />
              </TransactionsTypes>
              <CategorySelectButton
                title={category.name}
                onPress={handleOpenSelectCategoryModal}
              />
            </Fields>
            <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
          </Form>

          <Modal visible={categoryModalOpen}>
            <CategorySelect
              category={category}
              setCategory={setCategory}
              closeSelectCategory={handleCloseSelectCategoryModal}
            />
          </Modal>
        </Container>
      </TouchableWithoutFeedback>
    </>
  );
}
