import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Movie} from '../dto/movie';
const useFavorites = (searchText?: string) => {
  const [favoriteData, setFavoriteData] = useState<Movie[]>([]);
  const [filteredFavoriteData, setFilteredFavoriteData] = useState<Movie[]>([]);
  const [errorTextFavorites, setErrorTextFavorites] = useState<string>('');
  const [successMessageFavorite, setSuccessMessageFavorite] =
    useState<string>('');
  const saveFavorite = async (movie: Movie) => {
    try {
      const listOfMoviesToSave = [...favoriteData, movie];
      const strMovieList = JSON.stringify(listOfMoviesToSave);
      await AsyncStorage.setItem('favoriteMovies', strMovieList);
      getFavorites();
      setSuccessMessageFavorite('Saving favorite successful.');
    } catch (error) {
      setErrorTextFavorites('Saving favorite failed. Try again.');
    }
  };
  const removeFavorite = async (movie: Movie) => {
    try {
      const listOfMoviesToSave = favoriteData.filter(
        movieObj => movie.imdbID !== movieObj.imdbID,
      );
      const strMovieList = JSON.stringify(listOfMoviesToSave);
      await AsyncStorage.setItem('favoriteMovies', strMovieList);
      getFavorites();
      setSuccessMessageFavorite('Removing favorite successful.');
    } catch (error) {
      setErrorTextFavorites('Removing from favorite failed. Try again.');
    }
  };
  const checkIfFavorite = (movie: Movie) => {
    const objExists = favoriteData.filter(
      movieObj => movie.imdbID === movieObj.imdbID,
    );
    return objExists?.length >= 1;
  };
  const getFavorites = async () => {
    try {
      const strMovieList = await AsyncStorage.getItem('favoriteMovies');
      const listOfFavorites = strMovieList
        ? await JSON.parse(strMovieList)
        : [];
      setFavoriteData(listOfFavorites);
      setFilteredFavoriteData(listOfFavorites);
    } catch (error) {
      setErrorTextFavorites(
        'Loading favorits failed. Close the app and open again.',
      );
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
    if (searchText) {
      const filteredData = favoriteData.filter(movie =>
        movie.Title.includes(searchText),
      );
      setFilteredFavoriteData(filteredData ? filteredData : []);
    } else {
      setFilteredFavoriteData(favoriteData);
    }
  }, [searchText]);

  return {
    favoriteData,
    filteredFavoriteData,
    errorTextFavorites,
    successMessageFavorite,
    saveFavorite,
    removeFavorite,
    checkIfFavorite,
    setErrorTextFavorites,
    setSuccessMessageFavorite,
  };
};

export default useFavorites;
