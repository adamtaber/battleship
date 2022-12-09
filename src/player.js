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
    this.allShipsPlaced = false
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

  randomPlacement(computer) {
    while(computer.carrierPlaced === false) {
      let array = ['horizontal', 'vertical']
      let arrayIndex = Math.floor(Math.random()*array.length);
      let orientation = array[arrayIndex];
      let row = Math.floor(Math.random() * 10);
      let column = Math.floor(Math.random() * 10);
      computer.placeCarrier(row, column, orientation)
    }
    while(computer.battleshipPlaced === false) {
      let array = ['horizontal', 'vertical']
      let arrayIndex = Math.floor(Math.random()*array.length);
      let orientation = array[arrayIndex];
      let row = Math.floor(Math.random() * 10);
      let column = Math.floor(Math.random() * 10);
      computer.placeBattleship(row, column, orientation)
    }
    while(computer.cruiserPlaced === false) {
      let array = ['horizontal', 'vertical']
      let arrayIndex = Math.floor(Math.random()*array.length);
      let orientation = array[arrayIndex];
      let row = Math.floor(Math.random() * 10);
      let column = Math.floor(Math.random() * 10);
      computer.placeCruiser(row, column, orientation)
    }
    while(computer.submarinePlaced === false) {
      let array = ['horizontal', 'vertical']
      let arrayIndex = Math.floor(Math.random()*array.length);
      let orientation = array[arrayIndex];
      let row = Math.floor(Math.random() * 10);
      let column = Math.floor(Math.random() * 10);
      computer.placeSubmarine(row, column, orientation)
    }
    while(computer.destroyerPlaced === false) {
      let array = ['horizontal', 'vertical']
      let arrayIndex = Math.floor(Math.random()*array.length);
      let orientation = array[arrayIndex];
      let row = Math.floor(Math.random() * 10);
      let column = Math.floor(Math.random() * 10);
      computer.placeDestroyer(row, column, orientation)
    }
    console.log(computer.playerBoard.boardArray)
  }

  //send attack
}

export default Player