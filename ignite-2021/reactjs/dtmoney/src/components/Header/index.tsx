import { logoImg } from '../../global/images';
import { ChangeTheme } from '../ChangeTheme';
import { Container, Content, ChangeThemeContent } from './styled';

interface HeaderProps {
  handleOpenNewTransactionModal: () => void;
}

export function Header({ handleOpenNewTransactionModal }: HeaderProps) {
  //const { toggleMode } = useTheme();

  return (
    <>
      <Container>
        <ChangeThemeContent>
          <ChangeTheme />
        </ChangeThemeContent>
        <Content>
          <img src={logoImg} alt="dt-money" />
          <div>
            <button type="button" onClick={handleOpenNewTransactionModal}>
              Nova transação
            </button>
          </div>
        </Content>
      </Container>
    </>
  );
}
