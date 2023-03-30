import * as React from 'react';
import { View, Text, Button } from 'react-native';
interface Props {
  navigation: any;
}
function FavoritesScreen({ navigation }:Props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Favorites</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default FavoritesScreen;