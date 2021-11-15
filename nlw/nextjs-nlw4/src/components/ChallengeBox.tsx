import { useChallenges } from '../hooks/useChallenges';
import { useCountdown } from '../hooks/useCountDown';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completedChallenge } = useChallenges();
  const { resetCountDown } = useCountdown();

  function handleChallengeSucceeded() {
    completedChallenge();
    resetCountDown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountDown();
  }

  return (
    <>
      <div className={styles.challengeBoxContainer}>
        {activeChallenge ? (
          <div className={styles.challengeActive}>
            <header>Ganhe {activeChallenge.amount} xp</header>
            <main>
              <img src={`icons/${activeChallenge.type}.svg`} alt="Body" />
              <strong>Novo desafio</strong>
              <p>{activeChallenge.description}</p>
            </main>
            <footer>
              <button type="button" className={styles.challengeFailedButton} onClick={handleChallengeFailed}>
                Falhei
              </button>
              <button type="button" className={styles.challengeSucceededButton} onClick={handleChallengeSucceeded}>
                Completei
              </button>
            </footer>
          </div>
        ) : (
          <div className={styles.challengeBoxNotActive}>
            <strong>Finalize um ciclo para receber um desafio</strong>
            <p>
              <img src="icons/level-up.svg" alt="Leve Up" />
              Avance de level completando desafios
            </p>
          </div>
        )}
      </div>
    </>
  );
}
