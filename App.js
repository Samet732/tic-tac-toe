import { StyleSheet, View } from 'react-native';
import React from 'react';
import TicTacToe from './components/TicTacToe';
import { BoardSize } from './components/Board';

export default function App() {
  return (
    <View style={styles.container}>
      <TicTacToe map={BoardSize["3x3"]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#99ccff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
