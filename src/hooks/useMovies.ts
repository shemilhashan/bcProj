import React, {useState, useEffect} from 'react';
import axios from 'axios';
const useMovies = (searchText: string) => {
  const [movieData, setMovieData] = useState<any>([]);
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `http://www.omdbapi.com/?apikey=62087cc1&s=${searchText}`,
      );
      console.log(data.data);
      setMovieData(data.data);
    };
    if (searchText.length > 2) {
      getData();
    }
  }, [searchText]);
  return {movieData};
};

export default useMovies;
