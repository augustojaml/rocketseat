/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useEffect, useRef, useState } from 'react';

import { usePlayer } from '../../hooks/UsePlayer';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import styles from './styles.module.scss';

export function Player() {
  const {
    episodeList,
    currentEpisodeList,
    isPlaying,
    togglePlay,
    setPlayingState,
    playNext,
    playPrevious,
    hashNext,
    hashPrevious,
    isLooping,
    toggleLoop,
    isShuffling,
    toggleShuffle,
    clearPlayerState,
  } = usePlayer();

  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const episode = episodeList[currentEpisodeList];

  function setupProgressListener() {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  }

  function handleSeek(amount: number) {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  function handleEpisodeEnded() {
    if (hashNext) {
      playNext();
    } else {
      clearPlayerState();
    }
  }

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <>
      <div className={styles.playerContainer}>
        <header>
          <img src="./playing.svg" alt="Playing now" />
          <p>Tocando agora</p>
        </header>

        {episode ? (
          <div className={styles.currentEpisode}>
            <Image
              width={592}
              height={592}
              src={episode.thumbnail}
              objectFit="cover"
              alt={episode.title}
            />
            <strong>{episode.title}</strong>
            <span>{episode.members}</span>
          </div>
        ) : (
          <div className={styles.emptyPlayer}>
            <strong>Selecione um podcast para ouvir</strong>
          </div>
        )}

        <footer className={!episode ? styles.empty : ''}>
          <div className={styles.progress}>
            <span>{convertDurationToTimeString(progress)}</span>
            <div className={styles.slider}>
              {episode ? (
                <>
                  <Slider
                    max={episode.duration}
                    value={progress}
                    trackStyle={{ backgroundColor: '#04d361' }}
                    railStyle={{ backgroundColor: '#9f75ff' }}
                    handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                    onChange={handleSeek}
                  />
                </>
              ) : (
                <div className={styles.emptySlider} />
              )}
            </div>
            <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
          </div>

          {episode && (
            <>
              <audio
                src={episode.url}
                autoPlay={true}
                ref={audioRef}
                loop={isLooping}
                onPlay={() => setPlayingState(true)}
                onPause={() => setPlayingState(false)}
                onLoadedMetadata={setupProgressListener}
                onEnded={handleEpisodeEnded}
              />
            </>
          )}

          <div className={styles.buttons}>
            <button
              type="button"
              disabled={!episode || episodeList.length === 1}
              onClick={toggleShuffle}
              className={isShuffling ? styles.isActive : ''}
            >
              <img src="./shuffle.svg" alt="Shuffle" />
            </button>
            <button
              type="button"
              disabled={!episode || hashPrevious}
              onClick={playPrevious}
            >
              <img src="./play-previous.svg" alt="Previous" />
            </button>

            <button
              type="button"
              className={styles.playButton}
              disabled={!episode}
              onClick={togglePlay}
            >
              {isPlaying ? (
                <img src="./pause.svg" alt="Play" />
              ) : (
                <img src="./play.svg" alt="Play" />
              )}
            </button>

            <button
              type="button"
              disabled={!episode || hashNext}
              onClick={playNext}
            >
              <img src="./play-next.svg" alt="Next" />
            </button>
            <button
              type="button"
              onClick={toggleLoop}
              className={isLooping ? styles.isActive : ''}
            >
              <img src="./repeat.svg" alt="Repeat" />
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}
