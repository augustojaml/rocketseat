import React from 'react';

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from './styled';

interface IImageSlider {
  imagesUrl: string[];
}

export function ImageSlider({ imagesUrl }: IImageSlider) {
  return (
    <>
      <Container>
        <ImageIndexes>
          <ImageIndex active={true} />
          <ImageIndex active={false} />
          <ImageIndex active={false} />
          <ImageIndex active={false} />
        </ImageIndexes>
        <CarImageWrapper>
          <CarImage source={{ uri: imagesUrl[0] }} />
        </CarImageWrapper>
      </Container>
    </>
  );
}
