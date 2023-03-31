// file: store.ts
import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import favoritesReducer from './favorites/reducer';
import movieReducer from './movies/reducer';

const reducer = combineReducers({
  movies: movieReducer,
  favorites: favoritesReducer,
});

export const store = configureStore({
  reducer,
});
