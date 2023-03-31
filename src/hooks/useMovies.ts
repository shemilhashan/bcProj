import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Movie} from '../dto/movie';
const useMovies = (searchText: string) => {
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const getData = async (nextLoad: boolean) => {
    try {
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
        } else {
          setHasNext(false);
        }
      }
    } catch (error) {
      setErrorText('Something went wrong. Try again.');
    }
  };
  useEffect(() => {
    if (searchText.length > 2) {
      getData(false);
    }
  }, [searchText]);
  const getNextPage = () => {
    if (hasNext) {
      setPageNumber(pageNumber + 1);
    }
  };
  useEffect(() => {
    getData(true);
  }, [pageNumber]);
  return {movieData, errorText, getNextPage};
};

export default useMovies;
