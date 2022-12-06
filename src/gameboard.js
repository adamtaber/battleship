import BattleshipFactory from './ship.js'

class GameboardFactory {
  constructor() {
    this.boardArray = []
  }

  createBoard() {
    for (let i = 0; i < 10; i++) {
      this.boardArray.push(['', '', '', '', '', '', '', '', '', '']);
    }
    console.log(this.boardArray);
  }

  placeShipHorizontal(ship, length, row, column) {
    for (let i = 0; i < length; i++) {
      this.boardArray[row][column + i] = ship;
    }
  }

  placeShipVertical(ship, length, row, column) {
    for (let i = 0; i < length; i++) {
      this.boardArray[row - i][column] = ship;
    }
  }

  receiveAttack(row, column) {
    if (this.boardArray[row][column] === '') {
      this.boardArray[row][column] = 'miss';
    } else if (this.boardArray[row][column] instanceof BattleshipFactory) {
      this.boardArray[row][column].hit();
      this.boardArray[row][column].isSunk();
      this.boardArray[row][column] = 'hit';
    }
  }
}

export default GameboardFactory;