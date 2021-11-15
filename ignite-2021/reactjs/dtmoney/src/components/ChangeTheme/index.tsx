import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Container } from './styled';

export function ChangeTheme() {
  const { toggleMode, mode } = useTheme();
  const [isActive, setIsActive] = useState(() => {
    return mode === 'light' ? true : false;
  });

  function handleSetActive() {
    setIsActive(!isActive);
    toggleMode();
  }

  return (
    <>
      <Container>
        <span>🌞</span>
        <span>🌛</span>
        <div
          className={isActive ? 'active' : ''}
          onClick={handleSetActive}
        ></div>
      </Container>
    </>
  );
}
