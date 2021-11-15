import { useChallenges } from '../hooks/useChallenges';
import styles from '../styles/components/CompletedChallenge.module.css';

export function CompletedChallenge() {
  const { challengeCompleted } = useChallenges();

  return (
    <>
      <div className={styles.completedChallengeContainer}>
        <span>Desafios completos</span>
        <span>{challengeCompleted}</span>
      </div>
    </>
  );
}
