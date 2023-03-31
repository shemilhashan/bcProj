import React, {useState, useEffect, useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Movie} from '../dto/movie';
import {Popup} from 'react-native-popup-confirm-toast';
import {useSelector, useDispatch} from 'react-redux';
import {setFavorites} from '../store/favorites/actions';
const useFavorites = (searchText?: string) => {
  const favoriteData = useSelector(
    (state: any) => state.favorites.favoriteData,
  );
  const dispatch = useDispatch();
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
        (movieObj: Movie) => movie.imdbID !== movieObj.imdbID,
      );
      const strMovieList = JSON.stringify(listOfMoviesToSave);
      await AsyncStorage.setItem('favoriteMovies', strMovieList);
      getFavorites();
      setSuccessMessageFavorite('Removing favorite successful.');
    } catch (error) {
      setErrorTextFavorites('Removing from favorite failed. Try again.');
    }
  };

  const confirmRemoveFavorite = async (movie: Movie) => {
    Popup.show({
      type: 'confirm',
      title: 'Remove!',
      textBody: 'Are you sure you want to remove this movie?',
      buttonText: 'Remove',
      confirmText: 'Cancel',
      callback: () => {
        removeFavorite(movie);
      },
      cancelCallback: () => {
        Popup.hide();
      },
    });
  };

  const checkIfFavorite = (movie: Movie) => {
    const objExists = favoriteData.filter(
      (movieObj: Movie) => movie.imdbID === movieObj.imdbID,
    );
    return objExists?.length >= 1;
  };
  const getFavorites = async () => {
    try {
      const strMovieList = await AsyncStorage.getItem('favoriteMovies');
      const listOfFavorites = strMovieList
        ? await JSON.parse(strMovieList)
        : [];
      dispatch(setFavorites(listOfFavorites));
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
      const filteredData = favoriteData.filter((movie: Movie) =>
        movie.Title.includes(searchText),
      );
      setFilteredFavoriteData(filteredData ? filteredData : []);
    } else {
      setFilteredFavoriteData(favoriteData);
    }
  }, [searchText]);

  useEffect(() => {
    if (errorTextFavorites) {
      Popup.show({
        type: 'danger',
        title: 'Failed!',
        textBody: errorTextFavorites,
        buttonText: 'Ok',
        callback: () => {
          setErrorTextFavorites('');
          Popup.hide();
        },
      });
    }
  }, [errorTextFavorites]);
  useEffect(() => {
    if (successMessageFavorite) {
      Popup.show({
        type: 'success',
        title: 'Success!',
        textBody: successMessageFavorite,
        buttonText: 'Ok',
        callback: () => {
          setSuccessMessageFavorite('');
          Popup.hide();
        },
      });
    }
  }, [successMessageFavorite]);

  useEffect(() => {
    setFilteredFavoriteData(favoriteData);
  }, [favoriteData]);

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
    confirmRemoveFavorite,
  };
};

export default useFavorites;
