import React from "react";
import { Dimensions, StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";
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
      goalIndexs: [],
      modalVisible: false,
      result: null
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
    // i row number, j column number
    const map = this.state.map.slice(0);

    function checker(i, i1, i2, i3) {
      if (
        map[i[0]][i[1]] === map[i1[0]][i1[1]]
        && map[i[0]][i[1]] === map[i2[0]][i2[1]]
        && map[i1[0]][i1[1]] === map[i2[0]][i2[1]]
        && map[i[0]][i[1]] === lastMove
        && map[i1[0]][i1[1]] === lastMove
        && map[i2[0]][i2[1]] === lastMove
      ) {
        // if map bigger than 3x3, you must to sort 4 x or o for win
        if (map.length > 3)
          if (
            map[i[0]][i[1]] === map[i3[0]][i3[1]]
            && map[i1[0]][i1[1]] === map[i3[0]][i3[1]]
            && map[i2[0]][i2[1]] === map[i3[0]][i3[1]]
            && map[i3[0]][i3[1]] === lastMove
          ) return true;
          else return false;
        else return true;
      }
      else return false;
    }

    // checks rows
    for (let i = 0; i < this.props.map; i++)
      for (let j = 0; j < this.props.map - 2; j++)
        if (checker([i, j], [i, j + 1], [i, j + 2], [i, j + 3]))
          return this.finish([[i, j], [i, j + 1], [i, j + 2], [i, j + 3]], lastMove);

    // checks columns
    for (let i = 0; i < this.props.map - 2; i++)
      for (let j = 0; j < this.props.map; j++)
        if (checker([i, j], [i + 1, j], [i + 2, j], [i + 3, j]))
          return this.finish([[i, j], [i + 1, j], [i + 2, j], [i + 3, j]], lastMove);

    // checks cross
    for (let i = 0; i < this.props.map - 2; i++)
      for (let j = 0; j < this.props.map - 2; j++)
        if (checker([i, j], [i + 1, j + 1], [i + 2, j + 2], [i + 3, j + 3]))
          return this.finish([[i, j], [i + 1, j + 1], [i + 2, j + 2], [i + 3, j + 3]], lastMove);

    // checks revrese cross
    for (let i = 0; i < this.props.map - 2; i++)
      for (let j = this.props.map - 1; j > 1; j--)
        if (checker([i, j], [i + 1, j - 1], [i + 2, j - 2], [i + 3, j - 3]))
          return this.finish([[i, j], [i + 1, j - 1], [i + 2, j - 2], [i + 3, j - 3]], lastMove);

    // checks draw
    let findUndefined = false;
    for (let i = 0; i < this.props.map; i++)
      for (let j = 0; j < this.props.map; j++)
        if (map[i][j] === undefined)
          findUndefined = true;

    if (!findUndefined)
      return this.finish([], null);
  }

  finish(indexs, lastMove) {
    if (this.props.map === 3)
      indexs.pop();

    this.setState({
      goalIndexs: indexs,
      continuing: false,
      modalVisible: true,
      result: lastMove
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.status}>
          <View style={[styles.statusBox, { backgroundColor: this.state.player ? 'red' : 'transparent' }]}>
            <Text style={{ fontSize: 18 }}>Player 1</Text>
          </View>
          <View style={[styles.statusBox, { backgroundColor: !this.state.player ? 'white' : 'transparent' }]}>
            <Text style={{ fontSize: 18 }}>Player 2</Text>
          </View>
        </View>
        <Board
          map={this.state.map}
          size={this.props.map}
          onClick={this.onClick}
          goalIndexs={this.state.goalIndexs}
        />
        <Text 
          style={{ color: '#0073e6', position: 'absolute', bottom: 40, fontSize: 22 }}
          onPress={() => this.props.navigation.navigate('SelectMap')}>
          Go Back
        </Text>

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.modal}>
              <Text style={styles.modalText}>{(() => {
                if (this.state.result)
                  return 'Player 1 won!';
                else if (this.state.result === false)
                  return 'Player 2 won!';
                else return 'Draw!';
              })()}</Text>
              <TouchableOpacity onPress={() => this.setState({ modalVisible: false })}>
                <View style={styles.closeBtn}>
                  <Text style={{ color: '#fff' }}>Close</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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

  status: {
    width: Dimensions.get('window').width - 30,
    height: 40,
    marginHorizontal: 15,
    marginBottom: 50,
    flexDirection: 'row'
  },

  statusBox: {
    width: (Dimensions.get('window').width - 30) / 2 - 2,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center'
  },

  modal: {
    backgroundColor: '#fff',
    borderRadius: 30,
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.8,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalText: {
    fontSize: 32,
    marginBottom: 10
  },

  closeBtn: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#0073e6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10
  }
});
