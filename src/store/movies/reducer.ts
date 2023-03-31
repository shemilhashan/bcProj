import {Movie} from '../../dto/movie';
import {SET_MOVIES} from './types';
const initialState: {movieData: Movie[]} = {
  movieData: [],
};
const movieReducer = (
  state = initialState,
  action: {type: any; movies: Movie[]},
) => {
  switch (action.type) {
    case SET_MOVIES:
      return {
        ...state,
        movieData: action.movies,
      };
    default:
      return state;
  }
};
export default movieReducer;
