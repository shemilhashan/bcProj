import React, {useEffect, useState} from 'react';
import {View, Text, Button, SafeAreaView} from 'react-native';
import axios from 'axios';
import {SearchBar} from 'react-native-elements';
interface Props {
  navigation: any;
}
function DashboardScreen({navigation}: Props) {
  const [movieData, setMovieData] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>('');
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
  const navigateToFavorites = () => {
    navigation.navigate('Favorites');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 0}}>
        <SearchBar
          platform="default"
          placeholder="Type Here..."
          onChangeText={setSearchText}
          value={searchText}
        />
      </View>
    </SafeAreaView>
  );
}

export default DashboardScreen;
