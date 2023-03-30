import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import axios from 'axios';
interface Props {
  navigation: any;
}
function DashboardScreen({navigation}: Props) {
  const [movieData, setMovieData] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>('mat');
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `http://www.omdbapi.com/?apikey=62087cc1&s=${searchText}`,
      );
      setMovieData(data.data);
    };
    if (searchText.length > 2) {
      getData();
    }
  }, [searchText]);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Dashboard</Text>
      <Button
        title="Favorites"
        onPress={() => navigation.navigate('Favorites')}
      />
    </View>
  );
}

export default DashboardScreen;
