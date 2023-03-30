import * as React from 'react';
import { View, Text, Button } from 'react-native';
interface Props {
    navigation: any;
}
function DashboardScreen({ navigation }:Props) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Dashboard</Text>
        <Button
          title="Favorites"
          onPress={() => navigation.navigate('Favorites')}
        />
      </View>
    );
  }

export default DashboardScreen;