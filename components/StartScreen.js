import React from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity, Text } from "react-native";

export default function StartScreen({ navigation }) {
  const onPlayPressed = () => {
    navigation.navigate('SelectMap');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TicTacToe</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity onPress={onPlayPressed}>
          <View style={styles.panel}>
            <Text style={styles.text}>Play</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={{ fontStyle: 'italic', color: '#595959', marginBottom: 5 }}>TicTacToe v1.0.0 Created by Samet SEVINDIK.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#99ccff',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingLeft: 10,
    paddingRight: 5
  },

  panel: {
    backgroundColor: '#0073e6',
    width: (Dimensions.get('window').width - 30) / 2,
    height: (Dimensions.get('window').width - 30) / 3,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5
  },

  text: {
    color: '#fff',
    fontSize: 30
  },

  header: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },

  content: {
    flex: 3,
    alignItems: 'center'
  },

  title: {
    color: '#fff',
    fontSize: 56,
    transform: [
      { rotateZ: '-15deg' },
      { rotateX: '25deg' }
    ],
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  }
});