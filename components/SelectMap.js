import React from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, ScrollView } from 'react-native';

export default function SelectMap({ onSelect, navigation }) {
  const onClick = (map) => {
    onSelect(map, navigation);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Map</Text>
      </View>
      <View style={{ flex: 3 }}>
        <ScrollView>
          <View style={styles.row}>
            <Panel title={"3x3"} onClick={onClick} />
            <Panel title={"4x4"} onClick={onClick} />
          </View>
          <View style={styles.row}>
            <Panel title={"5x5"} onClick={onClick} />
            <Panel title={"6x6"} onClick={onClick} />
          </View>
          <View style={styles.row}>
            <Panel title={"7x7"} onClick={onClick} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

function Panel({ title, onClick }) {
  return (
    <TouchableOpacity onPress={() => onClick(title)}>
      <View style={styles.panel}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
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
    paddingRight: 10
  },

  row: {
    flexDirection: 'row',
  },

  panel: {
    backgroundColor: '#0073e6',
    width: (Dimensions.get('window').width - 30) / 2,
    height: (Dimensions.get('window').width - 30) / 2,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginBottom: 10
  },

  text: {
    fontSize: 38,
    color: '#fff'
  },

  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    fontSize: 46,
    color: '#0073e6'
  }
});