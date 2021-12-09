import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from '../../components/Forms/Button';
import { categories } from '../../utils/categories';
import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from './styled';

interface ICategory {
  key: string;
  name: string;
}

interface ICategorySelect {
  category: ICategory;
  setCategory: (category: ICategory) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: ICategorySelect) {
  function handleCategorySelect(item: ICategory) {
    setCategory(item);
  }

  return (
    <>
      <Container>
        <Header>
          <Title>Categoria</Title>
        </Header>

        <FlatList
          style={{ flex: 1, width: '100%' }}
          data={categories}
          keyExtractor={item => item.key}
          ItemSeparatorComponent={Separator}
          renderItem={({ item }) => (
            <Category
              isActive={category.key === item.key}
              onPress={() => handleCategorySelect(item)}
            >
              <Icon name={item.icon} />
              <Name>{item.name}</Name>
            </Category>
          )}
        />
        <Footer>
          <Button title="Selecionar" onPress={closeSelectCategory} />
        </Footer>
      </Container>
    </>
  );
}
