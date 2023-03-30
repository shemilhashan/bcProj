import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {ItemProp} from '../screens/dashboard';
const MovieListItem = ({movie}: {movie: ItemProp}) => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        height: 60,
        marginTop: 5,
        justifyContent: 'center',
      }}>
      <Text style={{marginLeft: 20}}>{movie.Title}</Text>
    </View>
  );
};
export {MovieListItem};
