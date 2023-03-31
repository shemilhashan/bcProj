import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  ListRenderItem,
  StyleSheet,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {MovieListItem} from '../components/movieListItem';
import {BaseProps} from '../dto/base';
import {Movie} from '../dto/movie';
import useFavorites from '../hooks/useFavorites';
import {Root} from 'react-native-popup-confirm-toast';
function FavoritesScreen({navigation}: BaseProps) {
  const [searchText, setSearchText] = useState<string>('');
  const {
    filteredFavoriteData,
    saveFavorite,
    confirmRemoveFavorite,
    checkIfFavorite,
  } = useFavorites(searchText);
  const renderMovie: ListRenderItem<Movie> = ({item}) => {
    const isFavorite = checkIfFavorite(item);
    return (
      <MovieListItem
        movie={item}
        saveFavorite={saveFavorite}
        removeFavorite={confirmRemoveFavorite}
        isFavorite={isFavorite}
      />
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Root>
        <View style={styles.container}>
          <SearchBar
            platform="default"
            placeholder="Type Here..."
            onChangeText={setSearchText}
            value={searchText}
          />
          <FlatList<Movie>
            data={filteredFavoriteData}
            renderItem={renderMovie}
            keyExtractor={(item: Movie) => item.imdbID}
          />
        </View>
      </Root>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
});

export default FavoritesScreen;
