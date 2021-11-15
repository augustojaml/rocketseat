import { createContext, ReactNode, useContext, useState } from 'react';

interface PlayerProviderProps {
  children: ReactNode;
}

export interface EpisodeListProps {
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

interface PlayerContextData {
  episodeList: Array<EpisodeListProps>;
  currentEpisodeList: number;
  play: (episode: EpisodeListProps) => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
  playList: (list: EpisodeListProps[], index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  clearPlayerState: () => void;
  isPlaying: boolean;
  hashPrevious: boolean;
  hashNext: boolean;
  isLooping: boolean;
  isShuffling: boolean;
}

const PlayerContext = createContext({} as PlayerContextData);

function PlayerProvider({ children }: PlayerProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeList, setCurrentEpisodeList] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function play(episode: EpisodeListProps): void {
    setEpisodeList([episode]);
    setCurrentEpisodeList(0);
    setIsPlaying(true);
  }

  function playList(list: EpisodeListProps[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeList(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  const hashPrevious = currentEpisodeList < 1;
  const hashNext = !isShuffling || currentEpisodeList + 1 >= episodeList.length;

  function playNext() {
    const nextEpisodeList = currentEpisodeList + 1;
    if (hashNext) {
      return;
    }

    setCurrentEpisodeList(nextEpisodeList);
  }

  function playPrevious() {
    if (isShuffling) {
      const nextRandomEpisodeList = Math.floor(
        Math.random() * episodeList.length
      );
      setCurrentEpisodeList(nextRandomEpisodeList);
    } else if (hashNext) {
      const previousEpisodeList = currentEpisodeList - 1;
      if (hashPrevious) {
        return;
      }

      setCurrentEpisodeList(previousEpisodeList);
      setIsPlaying(true);
    }
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeList(0);
  }

  return (
    <>
      <PlayerContext.Provider
        value={{
          episodeList,
          currentEpisodeList,
          play,
          togglePlay,
          setPlayingState,
          playList,
          isPlaying,
          playNext,
          playPrevious,
          hashPrevious,
          hashNext,
          isLooping,
          toggleLoop,
          toggleShuffle,
          isShuffling,
          clearPlayerState,
        }}
      >
        {children}
      </PlayerContext.Provider>
    </>
  );
}

function usePlayer() {
  return useContext(PlayerContext);
}

export { PlayerProvider, usePlayer };
