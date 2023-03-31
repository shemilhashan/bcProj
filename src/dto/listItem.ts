import {Movie} from './movie';
export interface ListItemProps {
  movie: Movie;
  isFavorite?: boolean;
  saveFavorite: (movie: Movie) => void;
  removeFavorite: (movie: Movie) => void;
}
