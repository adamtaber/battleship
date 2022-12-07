import BattleshipFactory from './src/ship.js';
import GameboardFactory from './src/gameboard.js';

test('test works', () => {
  expect(1).toBe(1);
})

test('hit increases hits', () => {
  let ship = new BattleshipFactory(1);
  ship.hit();
  expect(ship.hits).toBe(1);
})

test('isSunk changes sunk value', () => {
  let ship = new BattleshipFactory(1);
  ship.hit();
  ship.isSunk();
  expect(ship.sunk).toBe(true);
})

test('creates board', () => {
  let board = new GameboardFactory();
  board.createBoard();
  expect(board.boardArray.length).toBe(10);
})

test('places ship horizontally on board', () => {
  let ship = new BattleshipFactory(2);
  let board = new GameboardFactory();
  board.createBoard();
  board.placeShipHorizontal(ship, ship.length, 0, 0);
  expect(board.boardArray[0][0][0] && board.boardArray[0][1][0]).toBe(ship);
  expect(board.boardArray[0][2][0]).toBe(undefined);
  expect(board.boardArray[1][0][0]).toBe(undefined);
})

test('places ship vertically on board', () => {
  let ship = new BattleshipFactory(2);
  let board = new GameboardFactory();
  board.createBoard();
  board.placeShipVertical(ship, ship.length, 2, 0);
  expect(board.boardArray[1][0][0] && board.boardArray[2][0][0]).toBe(ship);
  expect(board.boardArray[0][0][0]).toBe(undefined);
  expect(board.boardArray[1][1][0]).toBe(undefined);
})

test('attack on empty square returns a miss', () => {
  let ship = new BattleshipFactory(2);
  let board = new GameboardFactory();
  board.createBoard();
  board.placeShipVertical(ship, ship.length, 2, 0);
  board.receiveAttack(0, 2);
  expect(board.boardArray[0][2]).toBe('miss');
})

test('attack on ship square returns a hit', () => {
  let ship = new BattleshipFactory(2);
  let board = new GameboardFactory();
  board.createBoard();
  board.placeShipVertical(ship, ship.length, 2, 0);
  board.receiveAttack(1, 0);
  expect(board.boardArray[1][0][1]).toBe('hit');
})

test('attack on ship increases hit count', () => {
  let ship = new BattleshipFactory(2);
  let board = new GameboardFactory();
  board.createBoard();
  board.placeShipVertical(ship, ship.length, 2, 0);
  board.receiveAttack(1, 0);
  expect(ship.hits).toBe(1);
})

test('AllShipsSunk returns true when all ships are sunk', () => {
  let ship = new BattleshipFactory(2);
  let board = new GameboardFactory();
  board.createBoard();
  board.placeShipVertical(ship, ship.length, 2, 0);
  board.receiveAttack(1, 0);
  board.receiveAttack(2, 0);
  expect(board.allShipsSunk()).toBe(true);
})

test('AllShipsSunk returns false when not all ships are sunk', () => {
  let ship = new BattleshipFactory(2);
  let board = new GameboardFactory();
  board.createBoard();
  board.placeShipVertical(ship, ship.length, 2, 0);
  board.receiveAttack(1, 0);
  expect(board.allShipsSunk()).toBe(false);
})