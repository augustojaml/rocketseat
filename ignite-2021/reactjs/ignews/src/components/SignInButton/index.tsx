import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/client';

import styles from './styles.module.scss';
import { useState } from 'react';

export function SignInButton() {
  const [check, setCheck] = useState(false);

  const [session] = useSession();

  return session ? (
    <>
      <button
        className={styles.SignInButton}
        type="button"
        onClick={() => signOut()}
      >
        <FaGithub
          className={styles.GithubIcon}
          style={{ color: 'var(--login)' }}
        />
        {session.user.name}
        <FiX
          className={styles.closeIcon}
          style={{ color: 'var(--gray-400)' }}
        />
      </button>
    </>
  ) : (
    <>
      <button
        className={styles.SignInButton}
        type="button"
        onClick={() => signIn('github')}
      >
        <FaGithub
          className={styles.GithubIcon}
          style={{ color: 'var(--logout)' }}
        />
        Sign in with Github
      </button>
    </>
  );
}
