import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Movie} from '../dto/movie';
import {Popup} from 'react-native-popup-confirm-toast';

const useMovies = (searchText: string) => {
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [errorTextMovies, setErrorTextMovies] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const getData = async (nextLoad: boolean) => {
    try {
      setLoading(true);
      const data = await axios.get(
        `http://www.omdbapi.com/?apikey=62087cc1&s=${searchText}&page=${pageNumber}`,
      );
      if (data && data.data) {
        if (nextLoad) {
          data.data.Search && setMovieData([...movieData, ...data.data.Search]);
        } else {
          setMovieData(data.data.Search);
        }
        if (pageNumber * 10 < data.data?.totalResults) {
          setHasNext(true);
          if (pageNumber === 1) {
            setPageNumber(2);
          }
        } else {
          setHasNext(false);
        }
      }
    } catch (error) {
      setErrorTextMovies('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };
  const search = () => {
    if (searchText.length > 2) {
      getData(false);
    }
  };
  // useEffect(() => {
  //   if (searchText.length > 2) {
  //     getData(false);
  //   }
  // }, [searchText]);
  const getNextPage = () => {
    if (hasNext) {
      setPageNumber(pageNumber + 1);
    }
  };
  useEffect(() => {
    getData(true);
  }, [pageNumber]);
  useEffect(() => {
    if (errorTextMovies) {
      Popup.show({
        type: 'danger',
        title: 'Failed!',
        textBody: errorTextMovies,
        buttonText: 'Ok',
        callback: () => {
          setErrorTextMovies('');
          Popup.hide();
        },
      });
    }
  }, [errorTextMovies]);
  return {
    movieData,
    errorTextMovies,
    loading,
    getNextPage,
    setErrorTextMovies,
    search,
  };
};

export default useMovies;
