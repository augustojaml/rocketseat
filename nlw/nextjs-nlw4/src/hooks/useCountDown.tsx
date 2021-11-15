import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useChallenges } from './useChallenges';

interface CountDownProviderProps {
  children: ReactNode;
}

interface CountDownContextProps {
  minutes: number;
  seconds: number;
  hashFinished: boolean;
  isActive: boolean;
  startCountDown: () => void;
  resetCountDown: () => void;
}

const CountDownContext = createContext({} as CountDownContextProps);

let initialTime = 25 * 60;

let countDownTimeout: NodeJS.Timeout;

function CountDownProvider({ children }: CountDownProviderProps) {
  const { startNewChallenge } = useChallenges();

  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [hashFinished, setHashFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountDown() {
    setIsActive(true);
  }

  function resetCountDown() {
    clearTimeout(countDownTimeout);
    setIsActive(false);
    setTime(initialTime);
    setHashFinished(false);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHashFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <>
      <CountDownContext.Provider value={{ minutes, seconds, hashFinished, isActive, startCountDown, resetCountDown }}>
        {children}
      </CountDownContext.Provider>
    </>
  );
}

function useCountdown(): CountDownContextProps {
  return useContext(CountDownContext);
}

export { CountDownProvider, useCountdown };
