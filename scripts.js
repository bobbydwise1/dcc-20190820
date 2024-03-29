/*
Good morning! Here's your coding interview problem for today.

This problem was asked by Dropbox.

Conway's Game of Life takes place on an infinite two-dimensional board of square cells. Each cell is either dead or alive, and at each tick, the following rules apply:

   Any live cell with less than two live neighbours dies.
   Any live cell with two or three live neighbours remains living.
   Any live cell with more than three live neighbours dies.
   Any dead cell with exactly three live neighbours becomes a live cell.

A cell neighbours another cell if it is horizontally, vertically, or diagonally adjacent.

Implement Conway's Game of Life. It should be able to be initialized with a starting list of live cell coordinates and the number of steps it should run for. Once initialized, it should print out the board state at each step. Since it's an infinite board, print out only the relevant coordinates, i.e. from the top-leftmost live cell to bottom-rightmost live cell.

You can represent a live cell with an asterisk (*) and a dead cell with a dot (.).
*/

class GameOfLife{
  constructor() {
    this.grid = [
      [9,9,9,9,9,9,9,9,9,9,9,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,1,1,1,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,9,9,9,9,9,9,9,9,9,9,9]
    ];
    this.nextGrid = [
      [9,9,9,9,9,9,9,9,9,9,9,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,9,9,9,9,9,9,9,9,9,9,9]
    ];
    this.timer = 0;
    this.gameOver = 0;
  }

  makeRandom(yourMin,yourMax) {
    return Math.round(Math.random()*(yourMax-yourMin)+yourMin)
  }

  populateRandom(yourNumber) {
    for (let k = 0; k<yourNumber; k++) {
      this.grid[this.makeRandom(1,10)][this.makeRandom(1,10)] = 1;
    }
    this.timer = 0;
    this.nextGrid = [
      [9,9,9,9,9,9,9,9,9,9,9,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,9,9,9,9,9,9,9,9,9,9,9]
    ]
  }

  sumAround(y,x) {
    return (this.grid[y-1][x-1] + this.grid[y-1][x] + this.grid[y-1][x+1] +
    this.grid[y][x-1] +                       this.grid[y][x+1] +
    this.grid[y+1][x-1] + this.grid[y+1][x] + this.grid[y+1][x+1]);
  }

  checkCells() {
    for (let y=0; y<this.grid.length; y++) {
      for (let x=0; x<this.grid.length; x++) {
        if (this.grid[y][x] === 1) {
          if (this.sumAround(y,x) < 2) {
            this.nextGrid[y][x] = 0;
            //live cell with less than 2 neighbors dies
          } else if (this.sumAround(y,x) > 3) {
            this.nextGrid[y][x] = 0;
            //live cell with more than 3 neighbors dies
          } else { this.nextGrid[y][x] = 1}
        } else if (this.grid[y][x] === 0) {
          if (this.sumAround(y,x) === 3) {
            this.nextGrid[y][x] = 1;
            //a dead cell becomes alive if it has 3 living neighbors
          }
        } else {this.nextGrid[y][x] = this.grid[y][x]}
      }
    }
    return 1;
  }

  stepForward() {
    this.checkCells();
    this.grid = this.nextGrid.slice();
    this.nextGrid = [
      [9,9,9,9,9,9,9,9,9,9,9,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0,0,9],
      [9,9,9,9,9,9,9,9,9,9,9,9]
    ];
    this.timer++;
    return 1;
  }
}

  let game = new GameOfLife()

$(document).ready(function() {
  $('#turns-output').text(game.timer);
  $('#output-section-0').text(JSON.stringify(game.grid[0]));
  $('#output-section-1').text(JSON.stringify(game.grid[1]));
  $('#output-section-2').text(JSON.stringify(game.grid[2]));
  $('#output-section-3').text(JSON.stringify(game.grid[3]));
  $('#output-section-4').text(JSON.stringify(game.grid[4]));
  $('#output-section-5').text(JSON.stringify(game.grid[5]));
  $('#output-section-6').text(JSON.stringify(game.grid[6]));
  $('#output-section-7').text(JSON.stringify(game.grid[7]));
  $('#output-section-8').text(JSON.stringify(game.grid[8]));
  $('#output-section-9').text(JSON.stringify(game.grid[9]));
  $('#output-section-10').text(JSON.stringify(game.grid[10]));
  $('#output-section-11').text(JSON.stringify(game.grid[11]));
    console.log(game.grid)

  $('#button1').click(function() {
    event.preventDefault();
    console.log('button1 clicked')
    game.populateRandom(20)
    $('#turns-output').text(game.timer);
    $('#output-section-0').text(JSON.stringify(game.grid[0]));
    $('#output-section-1').text(JSON.stringify(game.grid[1]));
    $('#output-section-2').text(JSON.stringify(game.grid[2]));
    $('#output-section-3').text(JSON.stringify(game.grid[3]));
    $('#output-section-4').text(JSON.stringify(game.grid[4]));
    $('#output-section-5').text(JSON.stringify(game.grid[5]));
    $('#output-section-6').text(JSON.stringify(game.grid[6]));
    $('#output-section-7').text(JSON.stringify(game.grid[7]));
    $('#output-section-8').text(JSON.stringify(game.grid[8]));
    $('#output-section-9').text(JSON.stringify(game.grid[9]));
    $('#output-section-10').text(JSON.stringify(game.grid[10]));
    $('#output-section-11').text(JSON.stringify(game.grid[11]));
    console.log(game.grid)
  });

  $('#button2').click(function() {
    event.preventDefault();
    console.log('button2 clicked')
    game.stepForward()
    $('#turns-output').text(game.timer);
    $('#output-section-0').text(JSON.stringify(game.grid[0]));
    $('#output-section-1').text(JSON.stringify(game.grid[1]));
    $('#output-section-2').text(JSON.stringify(game.grid[2]));
    $('#output-section-3').text(JSON.stringify(game.grid[3]));
    $('#output-section-4').text(JSON.stringify(game.grid[4]));
    $('#output-section-5').text(JSON.stringify(game.grid[5]));
    $('#output-section-6').text(JSON.stringify(game.grid[6]));
    $('#output-section-7').text(JSON.stringify(game.grid[7]));
    $('#output-section-8').text(JSON.stringify(game.grid[8]));
    $('#output-section-9').text(JSON.stringify(game.grid[9]));
    $('#output-section-10').text(JSON.stringify(game.grid[10]));
    $('#output-section-11').text(JSON.stringify(game.grid[11]));
    console.log(game.grid)
  });
});
