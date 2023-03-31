import {Movie} from '../../dto/movie';
import {SET_MOVIES} from './types';
export function setMovies(movies: Movie[]) {
  return {
    type: SET_MOVIES,
    movies: movies,
  };
}
