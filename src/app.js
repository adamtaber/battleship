import BattleshipFactory from './ship.js';
import GameboardFactory from './gameboard.js';
import Player from './player.js';


// function test() {
//   let ship = new BattleshipFactory(2, 'submarine');
//   let board = new GameboardFactory;
//   board.createBoard();
//   board.placeShipHorizontal(ship, ship.length, 0, 0);
//   console.log(board.placeShipHorizontal(ship, ship.length, 0, 1))
//   // board.receiveAttack(0, 0)
//   // board.receiveAttack(0, 1);
//   // console.log(ship);
//   console.log(board.boardArray);
//   // console.log(board.allShipsSunk())
// }

// test();

// let player = new Player('test');
// player.createPlayerBoard();
// console.log(player.playerBoard.boardArray);
// let playerTwo = new Player('testTwo');
// playerTwo.createPlayerBoard();

// console.log(player.playerBoard.boardArray)
// console.log(player.placeCarrier(3, 0, 'vertical'))
// console.log(player.placeCarrier(4, 0, 'vertical'))
// console.log(player.placeBattleship(4, 1, 'vertical'))
// console.log(player.placeSubmarine(6, 1, 'vertical'));


//create player objects and boards
let user = new Player('player');
let computer = new Player('computer');
user.createPlayerBoard();
computer.createPlayerBoard();

//print boards to the DOM
let boards = document.createElement('div');
boards.classList.add('boards');
document.body.append(boards);
user.playerBoard.printBoard(user.name, boards);
computer.playerBoard.printBoard(computer.name, boards);

//place computer ships in array
computer.randomPlacement(computer)

//have player place ships
user.playerBoard.addShipEventListener(user, user.playerBoard.carrierFunction, user.playerBoard.shipOrientation, 5, computer)
let commandBox = document.getElementById('commandBox');
commandBox.innerText = 'Place your carrier ship'

//add event listener to enemy board accepting attacks

function checkShips() {
  if(user.allShipsPlaced === false) {
    window.setTimeout(checkShips, 100);
  } else {
    computer.playerBoard.enemyBoardEventListener(computer, user);
  }
}

checkShips();

