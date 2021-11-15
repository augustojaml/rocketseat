import { CompletedChallenge } from '../components/CompletedChallenges';
import { CountDown } from '../components/CountDown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';

import Head from 'next/head';

import styles from '../styles/pages/Home.module.css';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountDownProvider } from '../hooks/useCountDown';
import { GetServerSideProps } from 'next';
import { ChallengeProvider } from '../hooks/useChallenges';

interface CookieProps {
  level: number;
  currentExperience: number;
  challengeCompleted: number;
}

export default function Home({ level, currentExperience, challengeCompleted }: CookieProps) {
  return (
    <>
      <ChallengeProvider level={level} currentExperience={currentExperience} challengeCompleted={challengeCompleted}>
        <Head>
          <title>Início | move.it</title>
        </Head>
        <div className={styles.container}>
          <ExperienceBar />
          <CountDownProvider>
            <section>
              <div>
                <Profile />
                <CompletedChallenge />
                <CountDown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountDownProvider>
        </div>
      </ChallengeProvider>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengeCompleted } = ctx.req.cookies as unknown as CookieProps;

  return {
    props: {
      level: level ?? null,
      currentExperience: currentExperience ?? null,
      challengeCompleted: challengeCompleted ?? null,
    },
  };
};
