import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {ItemProp} from '../screens/dashboard';
interface ListItemProps {
  movie: ItemProp;
  isFavorite?: boolean;
  saveFavorite: (movie: ItemProp) => void;
  removeFavorite: (movie: ItemProp) => void;
}
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
  return (
    <View
      style={{
        backgroundColor: 'black',
        height: 60,
        marginTop: 5,
        justifyContent: 'center',
      }}>
      <Text style={{marginLeft: 20}}>{movie.Title}</Text>
      <TouchableOpacity onPress={onPressFavorite}>
        <Text>{isFavorite ? 'Remove' : 'Add'}</Text>
      </TouchableOpacity>
    </View>
  );
};
export {MovieListItem};
