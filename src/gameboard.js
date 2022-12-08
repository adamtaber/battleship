import BattleshipFactory from './ship.js'
import Player from './player.js';

class GameboardFactory {
  constructor() {
    this.boardArray = []
    this.currentCoords = [0, 0]
    this.shipOrientation = 'horizontal'
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

  printBoard(name, container) {
    let boardContainer = document.createElement('div');
    boardContainer.classList.add('board-container');
    container.append(boardContainer);

    let boardTitle = document.createElement('p');
    boardTitle.classList.add('board-title')
    boardTitle.innerText = `${name} board`
    boardContainer.append(boardTitle);

    let gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');
    boardContainer.append(gridContainer);

    for (let i = 0; i < this.boardArray.length; i++) {
      for (let j = 0; j < this.boardArray[0].length; j++) {
        let square = document.createElement('div');
        square.classList.add('grid-square');
        square.setAttribute('id', `square${i}${j}`)
        gridContainer.append(square);
      }
    }
  }

  carrierFunction(user, orientation, i, j) {
    let commandBox = document.getElementById('commandBox');
    user.placeCarrier(i, j, orientation);
    if (user.carrierPlaced === true) {
      user.playerBoard.removeShipEventListener();
      user.playerBoard.addShipEventListener(user, user.playerBoard.battleshipFunction, user.playerBoard.shipOrientation, 4);
      commandBox.innerText = 'Place your battleship'
      user.playerBoard.colorShipLocations();
    } else {
      commandBox.innerText = 'Place your ship in a valid location'
    }
  }

  battleshipFunction(user, orientation, i, j) {
    let commandBox = document.getElementById('commandBox');
    user.placeBattleship(i, j, orientation);
    if (user.battleshipPlaced === true) {
      user.playerBoard.removeShipEventListener();
      user.playerBoard.addShipEventListener(user, user.playerBoard.cruiserFunction, user.playerBoard.shipOrientation, 3);
      commandBox.innerText = 'Place your cruiser'
      user.playerBoard.colorShipLocations();
    } else {
      commandBox.innerText = 'Place your ship in a valid location'
    }
  }

  cruiserFunction(user, orientation, i, j) {
    let commandBox = document.getElementById('commandBox');
    user.placeCruiser(i, j, orientation);
    if (user.cruiserPlaced === true) {
      user.playerBoard.removeShipEventListener();
      user.playerBoard.addShipEventListener(user, user.playerBoard.submarineFunction, user.playerBoard.shipOrientation, 3);
      commandBox.innerText = 'Place your submarine'
      user.playerBoard.colorShipLocations();
    } else {
      commandBox.innerText = 'Place your ship in a valid location'
    }
  }

  submarineFunction(user, orientation, i, j) {
    let commandBox = document.getElementById('commandBox');
    user.placeSubmarine(i, j, orientation);
    if (user.submarinePlaced === true) {
      user.playerBoard.removeShipEventListener();
      user.playerBoard.addShipEventListener(user, user.playerBoard.destroyerFunction, user.playerBoard.shipOrientation, 2);
      commandBox.innerText = 'Place your destroyer'
      user.playerBoard.colorShipLocations();
    } else {
      commandBox.innerText = 'Place your ship in a valid location'
    }
  }

  destroyerFunction(user, orientation, i, j) {
    let commandBox = document.getElementById('commandBox');
    user.placeDestroyer(i, j, orientation);
    if (user.destroyerPlaced === true) {
      user.playerBoard.removeShipEventListener();
      commandBox.innerText = 'You may now attack the enemy'
      user.playerBoard.colorShipLocations();
      let button = document.getElementById('orientation')
      let newButton = button.cloneNode(true)
      button.parentNode.replaceChild(newButton, button);
    } else {
      commandBox.innerText = 'Place your ship in a valid location'
    }
  }

  addShipEventListener(user, shipFunction, orientation, length) {
    for (let i = 0; i < this.boardArray.length; i++) {
      for (let j = 0; j < this.boardArray[0].length; j++) {
        let square = document.getElementById(`square${i}${j}`)
        square.addEventListener('click', () => {
          shipFunction(user, orientation, i, j)
          console.log(this.boardArray);
        })
        if(orientation === 'horizontal') {
          square.addEventListener('mouseover', () => {
            user.playerBoard.addHoverHorizontal(i, j, length)
          })
          square.addEventListener('mouseout', () => {
            user.playerBoard.removeHoverHorizontal(i, j, length);
          })
        } else {
          square.addEventListener('mouseover', () => {
            user.playerBoard.addHoverVertical(i, j, length)
          })
          square.addEventListener('mouseout', () => {
            user.playerBoard.removeHoverVertical(i, j, length);
          })
        }
      }
    }
    user.playerBoard.orientationEventListener(user, shipFunction, length)
  }

  removeShipEventListener() {
    for (let i = 0; i < this.boardArray.length; i++) {
      for (let j = 0; j < this.boardArray[0].length; j++) {
        let square = document.getElementById(`square${i}${j}`)
        let new_square = square.cloneNode(true);
        square.parentNode.replaceChild(new_square, square);
      }
    }
  }

  colorShipLocations() {
    for (let i = 0; i < this.boardArray.length; i++) {
      for (let j = 0; j < this.boardArray[0].length; j++) {
        let square = document.getElementById(`square${i}${j}`)
        if (this.boardArray[i][j][0] instanceof BattleshipFactory) {
          square.classList.add('ship-placed')
        }
      }
    }
  }

  addHoverHorizontal(i, j, length) {
    let fakeLength = length
    if(j + (fakeLength - 1) < 10) {
      while (fakeLength > 0) {
        let box = document.getElementById(`square${i}${j + (fakeLength - 1)}`)
        box.classList.add('ship-hover');
        fakeLength -= 1;
      }
    }
  }

  addHoverVertical(i, j, length) {
    let fakeLength = length
    if(i - (fakeLength - 1) >= 0) {
      while (fakeLength > 0) {
        let box = document.getElementById(`square${i - (fakeLength - 1)}${j}`)
        box.classList.add('ship-hover');
        fakeLength -= 1;
      }
    }
  }

  removeHoverHorizontal(i, j, length) {
    let fakeLength = length
    if(j + (fakeLength - 1) < 10) {
      while (fakeLength > 0) {
        let box = document.getElementById(`square${i}${j + (fakeLength - 1)}`)
        box.classList.remove('ship-hover');
        fakeLength -= 1;
      }
    }
  }

  removeHoverVertical(i, j, length) {
    let fakeLength = length
    if(i - (fakeLength - 1) >= 0) {
      while (fakeLength > 0) {
        let box = document.getElementById(`square${i - (fakeLength - 1)}${j}`)
        box.classList.remove('ship-hover');
        fakeLength -= 1;
      }
    }
  }

  orientationEventListener(user, shipFunction, length) {
    let button = document.getElementById('orientation')
    let newButton = button.cloneNode(true)
    button.parentNode.replaceChild(newButton, button);
    newButton.addEventListener('click', () => {
      if (user.playerBoard.shipOrientation === 'horizontal') {
        user.playerBoard.shipOrientation = 'vertical'
      } else {
        user.playerBoard.shipOrientation = 'horizontal'
      }
      user.playerBoard.removeShipEventListener();
      user.playerBoard.addShipEventListener(user, shipFunction, user.playerBoard.shipOrientation, length);
    })
  }

  // colorShipHoverHorizontal(length, l, m) {
  //   for (let i = m; i < length + 1; i++) {
  //     let square = document.getElementById(`square${l}${m}`)
  //     square.addEventListener('mouseover', () => {
  //       square.classList.add('ship-hover');
  //     })
  //     square.addEventListener('mouseout',() => {
  //       square.classList.remove('ship-hover');
  //     })
  //   }
  // }

  // addShipEventListener() {
  //   for (let i = 0; i < this.boardArray.length; i++) {
  //     for (let j = 0; j < this.boardArray[0].length; j++) {
  //       let square = document.getElementById(`square${i}${j}`)
  //       square.addEventListener('click', () => {
  //         this.currentCoords = [i, j]
  //       })
  //       square.addEventListener('mouseover', () => {
  //         this.currentCoords = [i, j]
  //       })
  //     }
  //   }
  // }
}

export default GameboardFactory;