import React from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {ListItemProps} from '../dto/listItem';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MovieListItem = ({
  movie,
  isFavorite = false,
  saveFavorite,
  removeFavorite,
}: ListItemProps) => {
  const onPressFavorite = () => {
    if (isFavorite) {
      removeFavorite(movie);
    } else {
      saveFavorite(movie);
    }
  };
  const FavoriteButton = () => {
    if (isFavorite) {
      return <Icon name="favorite" size={30} color="#E11299" />;
    } else {
      return <Icon name="favorite-border" size={30} color="gray" />;
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={{uri: movie.Poster}}
        style={styles.poster}
        resizeMode="contain"
      />
      <Text style={styles.title}>{movie.Title}</Text>
      <TouchableOpacity
        onPress={onPressFavorite}
        style={styles.buttonContainer}>
        <FavoriteButton />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: 60,
    marginTop: 5,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  title: {
    marginLeft: 0,
    flex: 1,
  },
  buttonContainer: {
    width: 100,
    alignItems: 'center',
  },
  poster: {
    height: 50,
    width: 100,
  },
});
export {MovieListItem};
