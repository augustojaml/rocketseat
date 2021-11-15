import { ButtonHTMLAttributes } from 'react';
import ReactLoading from 'react-loading';
import { useCustomTheme } from '../../global/useCustomTheme';
import { Container } from './styled';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function Button({ children, isLoading = false, ...rest }: IButtonProps) {
  const { customTheme } = useCustomTheme();

  return (
    <>
      {isLoading ? (
        <Container>
          <ReactLoading
            type="spin"
            color={customTheme.colors.secondary100}
            height={30}
            width={30}
          />
        </Container>
      ) : (
        <Container {...rest}>{children}</Container>
      )}
    </>
  );
}
