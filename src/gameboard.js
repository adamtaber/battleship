import BattleshipFactory from './ship.js'

class GameboardFactory {
  constructor() {
    this.boardArray = []
  }

  createBoard() {
    for (let i = 0; i < 10; i++) {
      this.boardArray.push(['', '', '', '', '', '', '', '', '', '']);
    }
  }

  placeShipHorizontal(ship, length, row, column) {
    if ((length + column) - 1 > 10) {
      console.log('this ship is too long for this space');
      return false;
    }
    for (let i = 0; i < length; i++) {
      if (this.boardArray[row][column + i] !== '') {
        console.log('there is a ship in the way');
        return false;
      }
    }
    for (let i = 0; i < length; i++) {
      this.boardArray[row][column + i] = [ship, 'not hit'];
    }
  }

  placeShipVertical(ship, length, row, column) {
    if ((row - length) + 1 < 0) {
      console.log('this ship is too long for this space');
      return false;
    }
    for (let i = 0; i < length; i++) {
      if (this.boardArray[row - i][column] !== '') {
        console.log('there is a ship in the way')
        return false
      }
    }
    for (let i = 0; i < length; i++) {
      this.boardArray[row - i][column] = [ship, 'not hit'];
    }
  }

  receiveAttack(row, column) {
    if (this.boardArray[row][column] === '') {
      this.boardArray[row][column] = 'miss';
    } else if (this.boardArray[row][column][0] instanceof BattleshipFactory) {
      this.boardArray[row][column][0].hit();
      this.boardArray[row][column][1] = 'hit';
    }
  }

  allShipsSunk() {
    let shipsSunk = true

    for (let i = 0; i < this.boardArray.length; i++) {
      for (let j = 0; j < this.boardArray[0].length; j++) {
        if (this.boardArray[i][j][1] === 'not hit') {
          shipsSunk = false
        }
      }
    }

    return shipsSunk;
  }

  printBoard() {
    let gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');
    document.body.append(gridContainer);
    for (let i = 0; i < this.boardArray.length; i++) {
      for (let j = 0; j < this.boardArray[0].length; j++) {
        let square = document.createElement('div');
        square.classList.add('grid-square');
        square.setAttribute('id', `square${i}${j}`)
        gridContainer.append(square);
      }
    }
  }
}

export default GameboardFactory;