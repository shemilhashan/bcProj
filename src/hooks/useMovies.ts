import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Movie} from '../dto/movie';
const useMovies = (searchText: string) => {
  const [movieData, setMovieData] = useState<Movie[]>([]);
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `http://www.omdbapi.com/?apikey=62087cc1&s=${searchText}`,
      );
      setMovieData(data.data.Search);
    };
    if (searchText.length > 2) {
      getData();
    }
  }, [searchText]);
  return {movieData};
};

export default useMovies;
