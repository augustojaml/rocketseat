/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from 'next/head';

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { api } from '../services/api';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

import styles from './home.module.scss';
import { usePlayer } from '../hooks/UsePlayer';

export interface EpisodeProps {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  publishedAt: string;
  duration: number;
  durationAsString: string;
  description: string;
  url: string;
}

interface HomeProps {
  latestEpisodes: Array<EpisodeProps>;
  allEpisodes: Array<EpisodeProps>;
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const { play, playList } = usePlayer();

  const episodes = [...latestEpisodes, ...allEpisodes];

  return (
    <>
      <Header>
        <title>Home | Postcastr</title>
      </Header>
      <div className={styles.homePageContainer}>
        <section className={styles.latestEpisodes}>
          <h2>Últimos lancamentos</h2>
          <ul>
            {latestEpisodes.map((episode, index) => {
              return (
                <li key={episode.id}>
                  <Image
                    width={192}
                    height={192}
                    objectFit="cover"
                    src={episode.thumbnail}
                    alt={episode.title}
                  />

                  <div className={styles.episodeDetails}>
                    <Link href={`/episodes/${episode.id}`}>
                      {episode.title}
                    </Link>
                    <p>{episode.members}</p>
                    <span>{episode.publishedAt}</span>
                    <span>{episode.durationAsString}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => playList(episodes, index)}
                  >
                    <img src="/play-green.svg" alt="Tocar episódio" />
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
        <section className={styles.allEpisodes}>
          <h2>Todos episódios</h2>
          <table cellSpacing={0}>
            <thead>
              <tr>
                <th></th>
                <th>Podcast</th>
                <th>Integrantes</th>
                <th>Data</th>
                <th>Duração</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allEpisodes.map((episode, index) => {
                return (
                  <tr key={episode.id}>
                    <td style={{ width: 72 }}>
                      <Image
                        width={120}
                        height={120}
                        src={episode.thumbnail}
                        alt={episode.title}
                        objectFit="cover"
                      />
                    </td>
                    <td>
                      <Link href={`/episodes/${episode.id}`}>
                        {episode.title}
                      </Link>
                    </td>
                    <td>{episode.members}</td>
                    <td style={{ width: 100 }}>{episode.publishedAt}</td>
                    <td>{episode.durationAsString}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() =>
                          playList(episodes, index + latestEpisodes.length)
                        }
                      >
                        <img src="/play-green.svg" alt="Tocar episódio" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _published_at: 'published_at',
      _order: 'desc',
    },
  });

  // @ts-ignore
  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      description: episode.description,
      url: episode.file.url,
    };
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
