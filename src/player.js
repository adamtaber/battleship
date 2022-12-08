import BattleshipFactory from './ship.js';
import GameboardFactory from './gameboard.js';

class Player {
  constructor(name) {
    this.name = name;
    this.playerBoard = []
    this.carrierPlaced = false
    this.battleshipPlaced = false
    this.cruiserPlaced = false
    this.submarinePlaced = false
    this.destroyerPlaced = false
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
      if(this.playerBoard.placeShipHorizontal(ship, ship.length, row, column) !== false) {
        this.carrierPlaced = true;
      }
    } else if (orientation === 'vertical') {
      if(this.playerBoard.placeShipVertical(ship, ship.length, row, column) !== false) {
        this.carrierPlaced = true;
      }    
    }
  }

  placeBattleship(row, column, orientation) {
    let ship = new BattleshipFactory(4, 'battleship');
    if(orientation === 'horizontal') {
      if(this.playerBoard.placeShipHorizontal(ship, ship.length, row, column) !== false) {
        this.battleshipPlaced = true;
      }
    } else if (orientation === 'vertical') {
      if(this.playerBoard.placeShipVertical(ship, ship.length, row, column) !== false) {
        this.battleshipPlaced = true;
      }    
    }
  }

  placeCruiser(row, column, orientation) {
    let ship = new BattleshipFactory(3, 'cruiser');
    if(orientation === 'horizontal') {
      if(this.playerBoard.placeShipHorizontal(ship, ship.length, row, column) !== false) {
        this.cruiserPlaced = true;
      }
    } else if (orientation === 'vertical') {
      if(this.playerBoard.placeShipVertical(ship, ship.length, row, column) !== false) {
        this.cruiserPlaced = true;
      } 
    }
  }

  placeSubmarine(row, column, orientation) {
    let ship = new BattleshipFactory(3, 'submarine');
    if(orientation === 'horizontal') {
      if(this.playerBoard.placeShipHorizontal(ship, ship.length, row, column) !== false) {
        this.submarinePlaced = true;
      }
    } else if (orientation === 'vertical') {
      if(this.playerBoard.placeShipVertical(ship, ship.length, row, column) !== false) {
        this.submarinePlaced = true;
      } 
    }
  }

  placeDestroyer(row, column, orientation) {
    let ship = new BattleshipFactory(2, 'destroyer');
    if(orientation === 'horizontal') {
      if(this.playerBoard.placeShipHorizontal(ship, ship.length, row, column) !== false) {
        this.destroyerPlaced = true;
      }
    } else if (orientation === 'vertical') {
      if(this.playerBoard.placeShipVertical(ship, ship.length, row, column) !== false) {
        this.destroyerPlaced = true;
      } 
    }
  }

  //send attack
}

export default Player