import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from './styled';

interface IImageSlider {
  imagesUrl: {
    id: string;
    photo: string;
  }[];
}

interface IChangeImage {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: IImageSlider) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: IChangeImage) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <>
      <Container>
        <ImageIndexes>
          {imagesUrl.map((item, index) => (
            <ImageIndex key={String(item.id)} active={imageIndex === index} />
          ))}
        </ImageIndexes>

        <FlatList
          data={imagesUrl}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={indexChanged.current}
          renderItem={({ item }) => (
            <>
              <CarImageWrapper>
                <CarImage source={{ uri: item.photo }} />
              </CarImageWrapper>
            </>
          )}
        />
      </Container>
    </>
  );
}
