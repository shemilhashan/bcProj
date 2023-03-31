import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  ListRenderItem,
  StyleSheet,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import useMovies from '../hooks/useMovies';
import {MovieListItem} from '../components/movieListItem';
import useFavorites from '../hooks/useFavorites';
import {Movie} from '../dto/movie';
import {BaseProps} from '../dto/base';
import {Root} from 'react-native-popup-confirm-toast';

function HomeScreen({navigation}: BaseProps) {
  const [searchText, setSearchText] = useState<string>('');
  const {saveFavorite, removeFavorite, checkIfFavorite} = useFavorites();
  const {movieData, getNextPage} = useMovies(searchText);
  const renderMovie: ListRenderItem<Movie> = ({item}) => {
    const isFavorite = checkIfFavorite(item);
    return (
      <MovieListItem
        movie={item}
        saveFavorite={saveFavorite}
        removeFavorite={removeFavorite}
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
            data={movieData}
            renderItem={renderMovie}
            keyExtractor={(item: Movie) => item.imdbID}
            onEndReachedThreshold={0.01}
            onEndReached={getNextPage}
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

export default HomeScreen;
