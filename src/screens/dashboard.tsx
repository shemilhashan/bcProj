import React, {useEffect, useState} from 'react';
import {View, Text, Button, SafeAreaView} from 'react-native';
import axios from 'axios';
import {SearchBar} from 'react-native-elements';
import useMovies from '../hooks/useMovies';
interface Props {
  navigation: any;
}
function DashboardScreen({navigation}: Props) {
  const [searchText, setSearchText] = useState<string>('');
  const {movieData} = useMovies(searchText)
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
