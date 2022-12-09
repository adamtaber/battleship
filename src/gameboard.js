import BattleshipFactory from './ship.js'
import Player from './player.js';

class GameboardFactory {
  constructor() {
    this.boardArray = []
    this.currentCoords = [0, 0]
    this.shipOrientation = 'horizontal'
    this.shipsSunk = false
  }

  createBoard() {
    for (let i = 0; i < 10; i++) {
      this.boardArray.push(['', '', '', '', '', '', '', '', '', '']);
    }
  }

  placeShipHorizontal(ship, length, row, column) {
    if ((length + column) - 1 > 10) {
      // console.log('this ship is too long for this space');
      return false;
    }
    for (let i = 0; i < length; i++) {
      if (this.boardArray[row][column + i] !== '') {
        // console.log('there is a ship in the way');
        return false;
      }
    }
    for (let i = 0; i < length; i++) {
      this.boardArray[row][column + i] = [ship, 'not hit'];
    }
  }

  placeShipVertical(ship, length, row, column) {
    if ((row - length) + 1 < 0) {
      // console.log('this ship is too long for this space');
      return false;
    }
    for (let i = 0; i < length; i++) {
      if (this.boardArray[row - i][column] !== '') {
        // console.log('there is a ship in the way')
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
    let sunk = true

    for (let i = 0; i < this.boardArray.length; i++) {
      for (let j = 0; j < this.boardArray[0].length; j++) {
        if (this.boardArray[i][j][1] === 'not hit') {
          sunk = false
        }
      }
    }

    this.shipsSunk = sunk;
    return sunk
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
        square.setAttribute('id', `${name}square${i}${j}`)
        gridContainer.append(square);
      }
    }
  }

  carrierFunction(user, orientation, i, j) {
    let commandBox = document.getElementById('commandBox');
    user.placeCarrier(i, j, orientation);
    if (user.carrierPlaced === true) {
      user.playerBoard.removeShipEventListener(user);
      user.playerBoard.addShipEventListener(user, user.playerBoard.battleshipFunction, user.playerBoard.shipOrientation, 4);
      commandBox.innerText = 'Place your battleship'
      user.playerBoard.colorShipLocations(user);
    } else {
      commandBox.innerText = 'Place your ship in a valid location'
    }
  }

  battleshipFunction(user, orientation, i, j) {
    let commandBox = document.getElementById('commandBox');
    user.placeBattleship(i, j, orientation);
    if (user.battleshipPlaced === true) {
      user.playerBoard.removeShipEventListener(user);
      user.playerBoard.addShipEventListener(user, user.playerBoard.cruiserFunction, user.playerBoard.shipOrientation, 3);
      commandBox.innerText = 'Place your cruiser'
      user.playerBoard.colorShipLocations(user);
    } else {
      commandBox.innerText = 'Place your ship in a valid location'
    }
  }

  cruiserFunction(user, orientation, i, j) {
    let commandBox = document.getElementById('commandBox');
    user.placeCruiser(i, j, orientation);
    if (user.cruiserPlaced === true) {
      user.playerBoard.removeShipEventListener(user);
      user.playerBoard.addShipEventListener(user, user.playerBoard.submarineFunction, user.playerBoard.shipOrientation, 3);
      commandBox.innerText = 'Place your submarine'
      user.playerBoard.colorShipLocations(user);
    } else {
      commandBox.innerText = 'Place your ship in a valid location'
    }
  }

  submarineFunction(user, orientation, i, j) {
    let commandBox = document.getElementById('commandBox');
    user.placeSubmarine(i, j, orientation);
    if (user.submarinePlaced === true) {
      user.playerBoard.removeShipEventListener(user);
      user.playerBoard.addShipEventListener(user, user.playerBoard.destroyerFunction, user.playerBoard.shipOrientation, 2);
      commandBox.innerText = 'Place your destroyer'
      user.playerBoard.colorShipLocations(user);
    } else {
      commandBox.innerText = 'Place your ship in a valid location'
    }
  }

  destroyerFunction(user, orientation, i, j) {
    let commandBox = document.getElementById('commandBox');
    user.placeDestroyer(i, j, orientation);
    if (user.destroyerPlaced === true) {
      user.playerBoard.removeShipEventListener(user);
      commandBox.innerText = 'You may now attack the enemy'
      user.playerBoard.colorShipLocations(user);
      let button = document.getElementById('orientation')
      let newButton = button.cloneNode(true)
      button.parentNode.replaceChild(newButton, button);
      user.allShipsPlaced = true;
    } else {
      commandBox.innerText = 'Place your ship in a valid location'
    }
  }

  addShipEventListener(user, shipFunction, orientation, length) {
    for (let i = 0; i < this.boardArray.length; i++) {
      for (let j = 0; j < this.boardArray[0].length; j++) {
        let square = document.getElementById(`${user.name}square${i}${j}`)
        square.addEventListener('click', () => {
          shipFunction(user, orientation, i, j)
          console.log(this.boardArray);
        })
        if(orientation === 'horizontal') {
          square.addEventListener('mouseover', () => {
            user.playerBoard.addHoverHorizontal(user, i, j, length)
          })
          square.addEventListener('mouseout', () => {
            user.playerBoard.removeHoverHorizontal(user, i, j, length);
          })
        } else {
          square.addEventListener('mouseover', () => {
            user.playerBoard.addHoverVertical(user, i, j, length)
          })
          square.addEventListener('mouseout', () => {
            user.playerBoard.removeHoverVertical(user, i, j, length);
          })
        }
      }
    }
    user.playerBoard.orientationEventListener(user, shipFunction, length)
  }

  removeShipEventListener(user) {
    for (let i = 0; i < this.boardArray.length; i++) {
      for (let j = 0; j < this.boardArray[0].length; j++) {
        let square = document.getElementById(`${user.name}square${i}${j}`)
        let new_square = square.cloneNode(true);
        square.parentNode.replaceChild(new_square, square);
      }
    }
  }

  colorShipLocations(user) {
    for (let i = 0; i < this.boardArray.length; i++) {
      for (let j = 0; j < this.boardArray[0].length; j++) {
        let square = document.getElementById(`${user.name}square${i}${j}`)
        if (this.boardArray[i][j][0] instanceof BattleshipFactory) {
          square.classList.add('ship-placed')
        }
      }
    }
  }

  addHoverHorizontal(user, i, j, length) {
    let fakeLength = length
    if(j + (fakeLength - 1) < 10) {
      while (fakeLength > 0) {
        let box = document.getElementById(`${user.name}square${i}${j + (fakeLength - 1)}`)
        box.classList.add('ship-hover');
        fakeLength -= 1;
      }
    }
  }

  addHoverVertical(user, i, j, length) {
    let fakeLength = length
    if(i - (fakeLength - 1) >= 0) {
      while (fakeLength > 0) {
        let box = document.getElementById(`${user.name}square${i - (fakeLength - 1)}${j}`)
        box.classList.add('ship-hover');
        fakeLength -= 1;
      }
    }
  }

  removeHoverHorizontal(user, i, j, length) {
    let fakeLength = length
    if(j + (fakeLength - 1) < 10) {
      while (fakeLength > 0) {
        let box = document.getElementById(`${user.name}square${i}${j + (fakeLength - 1)}`)
        box.classList.remove('ship-hover');
        fakeLength -= 1;
      }
    }
  }

  removeHoverVertical(user, i, j, length) {
    let fakeLength = length
    if(i - (fakeLength - 1) >= 0) {
      while (fakeLength > 0) {
        let box = document.getElementById(`${user.name}square${i - (fakeLength - 1)}${j}`)
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
      user.playerBoard.removeShipEventListener(user);
      user.playerBoard.addShipEventListener(user, shipFunction, user.playerBoard.shipOrientation, length);
    })
  }

  enemyBoardEventListener(computer, user) {
    for (let i = 0; i < this.boardArray.length; i++) {
      for (let j = 0; j < this.boardArray[0].length; j++) {
        let square = document.getElementById(`${computer.name}square${i}${j}`)
        square.addEventListener('mouseover', () => {
          square.classList.add('attack-hover');
        })
        square.addEventListener('mouseout', () => {
          square.classList.remove('attack-hover');
        })
        square.addEventListener('click', () => {
          computer.playerBoard.visualizePlayerAttack(computer, square, i, j);
          user.playerBoard.visualizeComputerAttack(user, computer)
        })
      }
    }
  }

  visualizePlayerAttack(computer, square, i, j) {
    if(computer.playerBoard.boardArray[i][j][1] === 'hit' ||
    computer.playerBoard.boardArray[i][j] === 'miss') {
      return
    } else {
      computer.playerBoard.receiveAttack(i, j)
    }

    if(computer.playerBoard.boardArray[i][j] === 'miss') {
      square.classList.add('miss-ship');
    } else if (computer.playerBoard.boardArray[i][j][1] === 'hit') {
      square.classList.add('hit-ship');
    }

    if(computer.playerBoard.boardArray[i][j][0].sunk === true) {
      let commandBox = document.getElementById('commandBox');
      commandBox.innerText = `You have sunk the enemy ${computer.playerBoard.boardArray[i][j][0].name}`
      computer.playerBoard.colorSunkShip(computer, computer.playerBoard.boardArray[i][j][0])
      computer.playerBoard.allShipsSunk();
      if(computer.playerBoard.shipsSunk === true) {
        commandBox.innerText = 'You have sunk all of the enemy ships!';
        computer.playerBoard.removeShipEventListener(computer);
      }
    }
  }

  visualizeComputerAttack(user, computer) {
    let array = user.playerBoard.boardArray
    let computerChoices = array.slice(0);
    let row = Math.floor(Math.random() * computerChoices.length)
    let column = Math.floor(Math.random() * computerChoices.length)

    if(user.playerBoard.boardArray[row][column][1] === 'hit' ||
    user.playerBoard.boardArray[row][column] === 'miss') {
      user.playerBoard.visualizeComputerAttack(user)
    } else {
      user.playerBoard.receiveAttack(row, column);
      computerChoices[row].slice(column);
    }

    let square = document.getElementById(`${user.name}square${row}${column}`)

    if(user.playerBoard.boardArray[row][column] === 'miss') {
      square.classList.add('miss-ship');
    } else if (user.playerBoard.boardArray[row][column][1] === 'hit') {
      square.classList.add('hit-ship');
    }

    if(user.playerBoard.boardArray[row][column][0].sunk === true) {
      user.playerBoard.colorSunkShip(user, user.playerBoard.boardArray[row][column][0])
      user.playerBoard.allShipsSunk();
      if(user.playerBoard.shipsSunk === true) {
        let commandBox = document.getElementById('commandBox');
        commandBox.innerText = 'The enemy has sunk all of your ships!'
        computer.playerBoard.removeShipEventListener(computer);
      }
    }



  }

  colorSunkShip(computer, ship) {
    for (let i = 0; i < this.boardArray.length; i++) {
      for (let j = 0; j < this.boardArray[0].length; j++) {
        let square = document.getElementById(`${computer.name}square${i}${j}`)
        if (computer.playerBoard.boardArray[i][j][0] === ship) {
          square.classList.add('ship-sunk');
        }
      }
    }
  }
}

export default GameboardFactory;