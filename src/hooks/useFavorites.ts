import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Movie} from '../dto/movie';
const useFavorites = () => {
  const [favoriteData, setFavoriteData] = useState<Movie[]>([]);
  const saveFavorite = async (movie: Movie) => {
    const listOfMoviesToSave = [...favoriteData, movie];
    const strMovieList = await JSON.stringify(listOfMoviesToSave);
    await AsyncStorage.setItem('favoriteMovies', strMovieList);
    getFavorites();
  };
  const removeFavorite = async (movie: Movie) => {
    const listOfMoviesToSave = favoriteData.filter(
      movieObj => movie.imdbID !== movieObj.imdbID,
    );
    const strMovieList = await JSON.stringify(listOfMoviesToSave);
    await AsyncStorage.setItem('favoriteMovies', strMovieList);
    getFavorites();
  };
  const checkIfFavorite = (movie: Movie) => {
    const objExists = favoriteData.filter(
      movieObj => movie.imdbID === movieObj.imdbID,
    );
    return objExists?.length >= 1;
  };
  const getFavorites = async () => {
    const strMovieList = await AsyncStorage.getItem('favoriteMovies');
    const listOfFavorites = strMovieList ? await JSON.parse(strMovieList) : [];
    setFavoriteData(listOfFavorites);
  };
  useEffect(() => {
    getFavorites();
  }, []);

  return {favoriteData, saveFavorite, removeFavorite, checkIfFavorite};
};

export default useFavorites;
