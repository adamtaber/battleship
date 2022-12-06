import BattleshipFactory from './ship.js';
import GameboardFactory from './gameboard.js';

console.log('test')

function test() {
  let ship = new BattleshipFactory(2);
  let board = new GameboardFactory;
  board.createBoard();
  board.placeShipHorizontal(ship, ship.length, 0, 0);
  board.receiveAttack(0, 0)
  board.receiveAttack(0, 1);
  console.log(ship);
}

test();
