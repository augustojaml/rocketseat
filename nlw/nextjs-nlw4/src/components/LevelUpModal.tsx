import { useChallenges } from '../hooks/useChallenges';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useChallenges();

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modalContainer}>
          <header>{level}</header>
          <strong>Parabéns</strong>
          <p>Você alcançou um novo Level</p>
          <button type="button" onClick={closeLevelUpModal}>
            <img src="icons/close.svg" alt="Close" />
          </button>
        </div>
      </div>
    </>
  );
}
