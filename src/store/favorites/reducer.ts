import {Movie} from '../../dto/movie';
import {SET_FAVORITES} from './types';
const initialState: {favoriteData: Movie[]} = {
  favoriteData: [],
};
const favoritesReducer = (
  state = initialState,
  action: {type: string; favorites: Movie[]},
) => {
  switch (action.type) {
    case SET_FAVORITES:
      return {
        ...state,
        favoriteData: action.favorites,
      };
    default:
      return state;
  }
};
export default favoritesReducer;
