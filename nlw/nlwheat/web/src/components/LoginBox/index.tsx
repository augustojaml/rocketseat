import styles from './styles.module.scss';
import { VscGithubInverted } from 'react-icons/vsc';
import { useEffect } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

// interface LoginBoxResponse {
//   findUser: {
//     id: string;
//     name: string;
//     github_id: number;
//     avatar_url: string;
//     login: string;
//   };
//   token: string;
// }

export function LoginBox() {
  const { user, signInURL } = useAuth();
  return (
    <>
      <div className={styles.loginBoxWrapper}>
        <strong>Entre e compartilhe sua message</strong>
        <a href={signInURL} className={styles.signWithGithub}>
          <VscGithubInverted size="24" />
          Entrar com Github
        </a>
      </div>
    </>
  );
}
