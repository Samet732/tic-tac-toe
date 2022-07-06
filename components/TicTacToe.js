import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Board from "./Board";

export default class TicTacToe extends React.Component {
  constructor(props) {
    super(props);

    // if map is 4x4 this code creates [[], [], [], []] value.
    const map = [];
    for (let i = 0; i < props.map; i++)
      map.push([]);

    this.state = {
      map: map.slice(0), // x: true, o: false
      player: true, // true: player 1 (x), false: player 2 (o)
      continuing: true
    };

    this.onClick = this.onClick.bind(this);
    this.check = this.check.bind(this);
  }

  onClick(i, j) {
    if (this.state.map[i][j] === undefined && this.state.continuing) {
      const map = this.state.map.slice(0);
      map[i][j] = this.state.player;
      this.setState({
        map: map,
        player: !this.state.player
      });
    }

    this.check(map[i][j]);
  }

  check(lastMove) {
    // check: who won ?
  }

  render() {
    return (
      <View style={styles.container}>
        <Board map={this.state.map} size={this.props.map} onClick={this.onClick} />
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
