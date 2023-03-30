import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { ItemProp } from '../screens/dashboard';
const useMovies = (searchText: string) => {
  const [movieData, setMovieData] = useState<ItemProp[]>([]);
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
  console.log('movieData: ', movieData)
  return {movieData};
};

export default useMovies;
