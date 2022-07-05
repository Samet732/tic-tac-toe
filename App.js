import { StyleSheet, View } from 'react-native';
import React from 'react';
import TicTacToe from './components/TicTacToe';

export default function App() {
  return (
    <View style={styles.container}>
      <TicTacToe />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
