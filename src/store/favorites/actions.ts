import {Movie} from '../../dto/movie';
import {SET_FAVORITES} from './types';
export function setFavorites(favorites: Movie[]) {
  return {
    type: SET_FAVORITES,
    favorites: favorites,
  };
}
