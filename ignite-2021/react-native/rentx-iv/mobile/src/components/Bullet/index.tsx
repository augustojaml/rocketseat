import React from 'react';

import { Container } from './styled';

interface IBullet {
  active?: boolean;
}

export function Bullet({ active = false }: IBullet) {
  return (
    <>
      <Container active={active} />
    </>
  );
}
