import { Star, Clock } from 'react-feather';

import { memo } from 'react';

import '../styles/movie-card.scss';

interface MovieCardProps {
  movie: {
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  };
}

export function MovieCardItem({ movie }: MovieCardProps) {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />

      <div>
        <div className="movie-info">
          <span>{movie.Title}</span>
          <div className="meta">
            <div>
              <Star /> {movie.Ratings[0].Value}
            </div>

            <div>
              <Clock /> {movie.Runtime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const MovieCard = memo(MovieCardItem, (prevProps, nextProps) => {
  return Object.is(prevProps.movie, nextProps.movie);
});
