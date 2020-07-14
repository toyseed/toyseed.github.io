const Alive = 1;
const Dead = 0;

export class JsUniverse {
  constructor(_width, _height) {
    this._width = _width;
    this._height = _height;
    this._cells = new Uint8Array(this._width * this._height).map(
      (value, index) => {
        return index % 2 === 0 || index % 7 === 0 ? Alive : Dead;
      },
    );
  }

  width() {
    return this._width;
  }

  height() {
    return this._height;
  }

  cells() {
    return this._cells;
  }

  set_width(width) {
    this._width = width;
  }

  set_height(height) {
    this._height = height;
  }

  toggle_cell(row, col) {
    let idx = this.getIndex(row, col);
    this._cells[idx] = this._cells[idx] === Alive ? Dead : Alive;
  }

  glider_on(row, col) {
    //not implemented
  }

  pulsar_on(row, col) {
    // not implemented
  }

  reset_cells() {
    this._cells = new Uint8Array(this._width * this._height);
  }

  random_cells(modular1, modular2) {
    this._cells = this._cells.map((value, index) => {
      return index % modular1 === 0 || index % modular2 === 0 ? Alive : Dead;
    });
  }

  tick() {
    let next = [];

    for (let row = 0; row < this._height; row++) {
      for (let col = 0; col < this._width; col++) {
        let index = this.getIndex(row, col);
        let lives = this.getLiveNeighborCount(row, col);
        let cell = this._cells[index];

        if (cell === Alive && lives < 2) {
          next.push(Dead);
        } else if (cell === Alive && lives >= 2 && lives <= 3) {
          next.push(Alive);
        } else if (cell === Alive && lives > 3) {
          next.push(Dead);
        } else if (cell === Dead && lives === 3) {
          next.push(Alive);
        } else {
          next.push(cell);
        }
      }
    }

    this._cells = next;
  }

  getIndex(row, col) {
    return row * this._width + col;
  }

  getLiveNeighborCount(row, col) {
    let count = 0;

    let north = row === 0 ? this._height - 1 : row - 1;
    let south = row === this._height - 1 ? 0 : row + 1;
    let west = col === 0 ? this._width - 1 : col - 1;
    let east = col === this._width - 1 ? 0 : col + 1;

    count =
      this._cells[this.getIndex(north, west)] +
      this._cells[this.getIndex(north, col)] +
      this._cells[this.getIndex(north, east)] +
      this._cells[this.getIndex(row, west)] +
      this._cells[this.getIndex(row, east)] +
      this._cells[this.getIndex(south, west)] +
      this._cells[this.getIndex(south, col)] +
      this._cells[this.getIndex(south, east)];

    return count;
  }

  _getLiveNeighborCount(row, col) {
    let count = 0;

    for (let rowDelta of [this._height - 1, 0, 1]) {
      for (let colDelta of [this._width - 1, 0, 1]) {
        if (rowDelta === 0 && colDelta === 0) {
          continue;
        }

        let neighborRow = (row + rowDelta) % this._height;
        let neighborCol = (col + colDelta) % this._width;
        let index = this.getIndex(neighborRow, neighborCol);

        count += this._cells[index];
      }
    }

    return count;
  }
}
