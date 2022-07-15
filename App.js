import React, { useState } from 'react';
import TicTacToe from './components/TicTacToe';
import { BoardSize } from './components/Board';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SelectMap from './components/SelectMap';
import StartScreen from './components/StartScreen';

export default function App() {
  const [map, setMap] = useState();
  const Stack = createNativeStackNavigator();

  const onSelect = (map, nav) => {
    setMap(BoardSize[map]);
    nav.navigate('TicTacToe');
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"StartScreen"}>
        <Stack.Screen name={"StartScreen"} component={StartScreen} />
        <Stack.Screen name={"SelectMap"}>
          {({ navigation }) => <SelectMap onSelect={onSelect} navigation={navigation} />}
        </Stack.Screen>
        <Stack.Screen name={"TicTacToe"}>
          {({ navigation }) => <TicTacToe map={map} navigation={navigation} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
