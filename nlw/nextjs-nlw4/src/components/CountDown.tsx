import { useCountdown } from '../hooks/useCountDown';
import styles from '../styles/components/CountDown.module.css';

export function CountDown() {
  const { minutes, seconds, hashFinished, isActive, resetCountDown, startCountDown } = useCountdown();

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <>
      <div>
        <div className={styles.countDownContainer}>
          <div>
            <span>{minuteLeft}</span>
            <span>{minuteRight}</span>
          </div>
          <span>:</span>
          <div>
            <span>{secondLeft}</span>
            <span>{secondRight}</span>
          </div>
        </div>

        {hashFinished ? (
          <button type="button" disabled className={`${styles.startCountDownButton}`} onClick={resetCountDown}>
            Ciclo encerrado
          </button>
        ) : (
          <>
            {isActive ? (
              <button
                type="button"
                className={`${styles.startCountDownButton} ${styles.startCountDownButtonActive}`}
                onClick={resetCountDown}
              >
                Abandonar ciclo
              </button>
            ) : (
              <button type="button" className={styles.startCountDownButton} onClick={startCountDown}>
                Iniciar ciclo
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}
