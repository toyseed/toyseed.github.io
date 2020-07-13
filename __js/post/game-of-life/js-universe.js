
const Alive = 1;
const Dead = 0;

export class JsUniverse {
    constructor(_width, _height) {
        this._width = _width;
        this._height = _height;
        this._cells = new Uint8Array(this._width * this._height)
            .map((value, index) => {
                return (index % 2 === 0 || index % 7 === 0) ? Alive : Dead;
            });

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

    getIndex(row, col) {
        return row * this._width + col;
    }

    getLiveNeighborCount(row, col) {
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
}

