import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Board, { BoardSize } from "./Board";

export default class TicTacToe extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Board size={BoardSize["3x3"]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#99ccff',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});
