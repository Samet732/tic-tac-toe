import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";

const BoardSize = {
  "3x3": 3,
  "4x4": 4,
  "5x5": 5
};

export default function Board({ size }) {
  // subtractions edge widths and margin from window width and divides to cell number
  const cellWidth = (Dimensions.get('window').width - (styles.container.marginHorizontal * 2 - (size - 1) * styles.edgeV.width)) / size

  return (
    <View style={styles.container}>
      {(() => {
        let edges = [];
        for (let i = 1; i < size; i++) {
          edges.push(
            <View style={[styles.edgeV, { marginLeft: cellWidth * i }]}></View>
          );
        }

        return edges;
      })()}

      {(() => {
        let edges = [];
        for (let i = 1; i < size; i++) {
          edges.push(
            <View style={[styles.edgeH, { marginTop: cellWidth * i }]}></View>
          );
        }

        return edges;
      })()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').width - 20
  },

  edgeV: {
    position: 'absolute',
    width: 5,
    height: Dimensions.get('window').width - 20,
    backgroundColor: '#004080'
  },

  edgeH: {
    position: 'absolute',
    height: 5,
    width: Dimensions.get('window').width - 20,
    backgroundColor: '#004080'
  }
});

export {
  BoardSize
};