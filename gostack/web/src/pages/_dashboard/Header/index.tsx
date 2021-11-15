import Link from 'next/link';
import { FiPower } from 'react-icons/fi';
import { ToggleTheme } from '../../../components/ToggleTheme';
import { useCustomTheme } from '../../../global/useCustomTheme';
import { useAccounts } from '../../../hooks/useAccounts';
import { HeaderContainer, Content, UserProfile } from './styled';

export function Header() {
  const { user, signOut } = useAccounts();
  const { customTheme } = useCustomTheme();
  return (
    <>
      <HeaderContainer>
        <Content>
          <div>
            <img
              src={
                customTheme.type === 'dark'
                  ? '/assets/logo-dark.png'
                  : '/assets/logo-light.png'
              }
              alt="AppGoBarber"
            />
            <Link href="/accounts/profile">
              <a>
                <UserProfile>
                  <img
                    src={
                      user && user?.avatar_url !== null
                        ? user?.avatar_url
                        : '/assets/default-user.png'
                    }
                    alt={user && user?.name ? user?.name : 'Default User'}
                  />
                  <div>
                    <span>Welcome,</span>
                    <strong>{user?.name}</strong>
                  </div>
                </UserProfile>
              </a>
            </Link>
          </div>
          <div className="themePower">
            <ToggleTheme />
            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </div>
        </Content>
      </HeaderContainer>
    </>
  );
}
