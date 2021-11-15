import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface ChallengeProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengeCompleted: number;
}

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengeProps {
  level: number;
  currentExperience: number;
  challengeCompleted: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completedChallenge: () => void;
  closeLevelUpModal: () => void;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
}

const ChallengeContext = createContext({} as ChallengeProps);

function ChallengeProvider({ children, ...rest }: ChallengeProviderProps) {
  const [level, setLevel] = useState(Number(rest.level) ?? 1);
  const [currentExperience, setCurrentExperience] = useState(Number(rest.currentExperience) ?? 0);
  const [challengeCompleted, setChallengeCompleted] = useState(Number(rest.challengeCompleted) ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelSetModalOpen, setIsOpenSetModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengeCompleted', String(challengeCompleted));
  }, [level, currentExperience, challengeCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsOpenSetModalOpen(true);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    setActiveChallenge(challenges[randomChallengeIndex]);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenges[randomChallengeIndex].amount} xp!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completedChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengeCompleted(challengeCompleted + 1);
  }

  function closeLevelUpModal() {
    setIsOpenSetModalOpen(false);
  }

  return (
    <>
      <ChallengeContext.Provider
        value={{
          level,
          currentExperience,
          challengeCompleted,
          levelUp,
          startNewChallenge,
          resetChallenge,
          activeChallenge,
          experienceToNextLevel,
          completedChallenge,
          closeLevelUpModal,
        }}
      >
        {children}
        {isLevelSetModalOpen && <LevelUpModal />}
      </ChallengeContext.Provider>
    </>
  );
}

function useChallenges(): ChallengeProps {
  return useContext(ChallengeContext);
}

export { ChallengeProvider, useChallenges };
