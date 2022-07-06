import React from "react";
import { StyleSheet, Dimensions, View, TouchableOpacity, Image } from "react-native";
import X from './../assets/x.png';
import O from './../assets/circle.png';

const BoardSize = {
  "3x3": 3,
  "4x4": 4,
  "5x5": 5
};

export default function Board({ map, size, onClick }) {
  // subtractions edge widths and margin from window width and divides to cell number
  const cellWidth = (Dimensions.get('window').width - (styles.container.marginHorizontal * 2 - (size - 1) * styles.edgeV.width)) / size;

  return (
    <View style={styles.container}>
      {(() => {
        let edges = [];
        for (let i = 1; i < size; i++) {
          edges.push(
            <View key={"v" + i} style={[styles.edgeV, { marginLeft: cellWidth * i }]}></View>
          );
        }

        return edges;
      })()}

      {(() => {
        let edges = [];
        for (let i = 1; i < size; i++) {
          edges.push(
            <View key={"h" + i} style={[styles.edgeH, { marginTop: cellWidth * i }]}></View>
          );
        }

        return edges;
      })()}

      {(() => {
        let touchs = [];
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            console.log(`key (${i}, ${j}): ${Date.now() * (i + j)}`);
            touchs.push(
              <TouchableOpacity
                key={Date.now() * (i + j)}
                style={{
                  position: 'absolute',
                  marginTop: cellWidth * i,
                  marginLeft: cellWidth * j,
                  width: cellWidth,
                  height: cellWidth,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={() => onClick(i, j)}>

                {(() => {
                  if (map[i][j] !== undefined) {
                    const width = map[i][j] ? cellWidth : cellWidth / 2
                    return (
                      <Image
                        source={(() => map[i][j] ? X : O)()}
                        style={{
                          width: width,
                          height: width
                        }}
                      />
                    );
                  }
                })()}
              </TouchableOpacity>
            );
          }
        }

        return touchs;
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