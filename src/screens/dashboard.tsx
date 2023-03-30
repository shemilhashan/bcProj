import React, {useState} from 'react';
import {View, SafeAreaView, FlatList, ListRenderItem} from 'react-native';
import {SearchBar} from 'react-native-elements';
import useMovies from '../hooks/useMovies';
import {MovieListItem} from '../components/movieListItem';
interface Props {
  navigation: any;
}
export interface ItemProp {
  Title: string;
  imdbID: string;
}
function DashboardScreen({navigation}: Props) {
  const [searchText, setSearchText] = useState<string>('');
  const {movieData} = useMovies(searchText);
  const navigateToFavorites = () => {
    navigation.navigate('Favorites');
  };
  const renderMovie: ListRenderItem<ItemProp> = ({item}) => {
    return <MovieListItem movie={item} />;
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
        <FlatList<ItemProp>
          data={movieData}
          renderItem={renderMovie}
          keyExtractor={(item: ItemProp) => item.imdbID}
        />
      </View>
    </SafeAreaView>
  );
}

export default DashboardScreen;
