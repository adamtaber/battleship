class BattleshipFactory {
  constructor(length, name, hits=0, sunk=false) {
    this.name = name;
    this.length = length;
    this.hits = hits;
    this.sunk = sunk;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    if (this.hits === this.length) {
      this.sunk = true;
    }
  }
}

export default BattleshipFactory;