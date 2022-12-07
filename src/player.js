import BattleshipFactory from './ship.js';
import GameboardFactory from './gameboard.js';

class Player {
  constructor(name) {
    this.name = name;
    this.playerBoard = []
  }

  createPlayerBoard() {
    let board = new GameboardFactory();
    board.createBoard();
    this.playerBoard = board;
  }

  //if placeCarrier is false, then alert player

  placeCarrier(row, column, orientation) {
    let ship = new BattleshipFactory(5, 'carrier');
    if(orientation === 'horizontal') {
      return this.playerBoard.placeShipHorizontal(ship, ship.length, row, column)
    } else if (orientation === 'vertical') {
      return this.playerBoard.placeShipVertical(ship, ship.length, row, column)
    }
  }

  placeBattleship(row, column, orientation) {
    let ship = new BattleshipFactory(4, 'battleship');
    if(orientation === 'horizontal') {
      return this.playerBoard.placeShipHorizontal(ship, ship.length, row, column)
    } else if (orientation === 'vertical') {
      return this.playerBoard.placeShipVertical(ship, ship.length, row, column)
    }
  }

  placeCruiser(row, column, orientation) {
    let ship = new BattleshipFactory(3, 'cruiser');
    if(orientation === 'horizontal') {
      return this.playerBoard.placeShipHorizontal(ship, ship.length, row, column)
    } else if (orientation === 'vertical') {
      return this.playerBoard.placeShipVertical(ship, ship.length, row, column)
    }
  }

  placeSubmarine(row, column, orientation) {
    let ship = new BattleshipFactory(3, 'submarine');
    if(orientation === 'horizontal') {
      return this.playerBoard.placeShipHorizontal(ship, ship.length, row, column)
    } else if (orientation === 'vertical') {
      return this.playerBoard.placeShipVertical(ship, ship.length, row, column)
    }
  }

  placeDestroyer(row, column, orientation) {
    let ship = new BattleshipFactory(2, 'destroyer');
    if(orientation === 'horizontal') {
      return this.playerBoard.placeShipHorizontal(ship, ship.length, row, column)
    } else if (orientation === 'vertical') {
      return this.playerBoard.placeShipVertical(ship, ship.length, row, column)
    }
  }

  //send attack
}

export default Player