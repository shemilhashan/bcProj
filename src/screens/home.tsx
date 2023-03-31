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
import Spinner from 'react-native-loading-spinner-overlay';
function HomeScreen({navigation}: BaseProps) {
  const [searchText, setSearchText] = useState<string>('');
  const {saveFavorite, confirmRemoveFavorite, checkIfFavorite} = useFavorites();
  const {movieData, loading, getNextPage, search} = useMovies(searchText);
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
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.container}>
          <SearchBar
            platform="default"
            placeholder="Type Here..."
            onChangeText={setSearchText}
            value={searchText}
            returnKeyType="search"
            onSubmitEditing={search}
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
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default HomeScreen;
