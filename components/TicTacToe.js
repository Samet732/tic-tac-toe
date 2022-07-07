import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Board from "./Board";

export default class TicTacToe extends React.Component {
  constructor(props) {
    super(props);

    // if map is 4x4 this code creates [[], [], [], []] value.
    let map = [];
    for (let i = 0; i < props.map; i++)
      map.push([]);

    this.state = {
      map: map.slice(0), // x: true, o: false
      player: true, // true: player 1 (x), false: player 2 (o)
      continuing: true,
      goalIndexs: []
    };

    this.onClick = this.onClick.bind(this);
    this.check = this.check.bind(this);
    this.finish = this.finish.bind(this);
  }

  onClick(i, j) {
    if (this.state.map[i][j] === undefined && this.state.continuing) {
      const map = this.state.map.slice(0);
      map[i][j] = this.state.player;
      this.setState({
        map: map,
        player: !this.state.player
      });

      this.check(map[i][j]);
    }
  }

  check(lastMove) {
    console.log(lastMove);
    // i row number, j column number
    const map = this.state.map.slice(0);

    function checker(i, i1, i2) {
      if (
        map[i[0]][i[1]] === map[i1[0]][i1[1]]
        && map[i[0]][i[1]] === map[i2[0]][i2[1]]
        && map[i1[0]][i1[1]] === map[i2[0]][i2[1]]
        && map[i[0]][i[1]] === lastMove
        && map[i1[0]][i1[1]] === lastMove
        && map[i2[0]][i2[1]] === lastMove
      ) return true;
      else return false;
    }

    // checks rows
    for (let i = 0; i < this.props.map; i++)
      for (let j = 0; j < this.props.map - 2; j++)
        if (checker([i, j], [i, j + 1], [i, j + 2]))
          return this.finish([[i, j], [i, j + 1], [i, j + 2]]);

    // checks columns
    for (let i = 0; i < this.props.map - 2; i++)
      for (let j = 0; j < this.props.map; j++)
        if (checker([i, j], [i + 1, j], [i + 2, j]))
          return this.finish([[i, j], [i + 1, j], [i + 2, j]]);

    // checks cross
    for (let i = 0; i < this.props.map - 2; i++)
      for (let j = 0; j < this.props.map - 2; j++)
        if (checker([i, j], [i + 1, j + 1], [i + 2, j + 2]))
          return this.finish([[i, j], [i + 1, j + 1], [i + 2, j + 2]]);

    // FIXME
    // checks revrese cross
    for (let i = this.props.map - 1; i > 1; i++)
      for (let j = this.props.map; j > 1; j++)
        if (checker([i, j], [i + 1, j - 1], [i + 2, j - 2]))
          return this.finish([[i, j], [i + 1, j - 1], [i + 2, j - 2]]);
  }

  finish(indexs) {
    this.setState({
      goalIndexs: indexs,
      continuing: false
    });

    console.log("win: " + indexs);
    console.log(this.state.map);
  }

  render() {
    return (
      <View style={styles.container}>
        <Board
          map={this.state.map}
          size={this.props.map}
          onClick={this.onClick}
          goalIndexs={this.state.goalIndexs}
        />
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
