import { useChallenges } from '../hooks/useChallenges';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useChallenges();
  return (
    <>
      <div className={styles.profileContainer}>
        <img
          src="https://xesque.rocketseat.dev/users/avatar/profile-c3e758a5-c302-43b2-8861-10567e7df29e-1632953492829.jpg"
          alt="profile"
        />
        <div>
          <strong>Augusto Monteiro</strong>
          <p>
            <img src="icons/level.svg" alt="level" />
            Leve {level}
          </p>
        </div>
      </div>
    </>
  );
}
