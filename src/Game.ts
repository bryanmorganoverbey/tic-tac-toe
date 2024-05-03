export default class Game {
  public movesMade: number;
  public gameboard: string[];
  public whosTurn: string = "player1";
  constructor() {
    this.movesMade = 0;
    // create a 3x3 game board as a one-dimensional array of null values
    this.gameboard = Array(9).fill(' ');

  }


  public printGameBoard = () => {
    console.log(` ${this.gameboard[0]} | ${this.gameboard[1]} | ${this.gameboard[2]} `,
    `\n-----------\n`,
    `${ this.gameboard[3] } | ${ this.gameboard[4] } | ${ this.gameboard[5] }`,
    `\n-----------\n`,
    `${this.gameboard[6]} | ${this.gameboard[7]} | ${this.gameboard[8]}`
    )
  }

  winnerDetermined = () => {
    if (
      ((this.gameboard[1] === "X" || this.gameboard[1] === "O") && (this.gameboard[0] === this.gameboard[1] && this.gameboard[1] === this.gameboard[2]))
      ||
      ((this.gameboard[4] === "X" || this.gameboard[4] === "O") && (this.gameboard[3] === this.gameboard[4] && this.gameboard[4] === this.gameboard[5]))
      ||
      ((this.gameboard[7] === "X" || this.gameboard[7] === "O") && (this.gameboard[6] === this.gameboard[7] && this.gameboard[7] === this.gameboard[8]))
        ||
      ((this.gameboard[4] === "X" || this.gameboard[4] === "O") && (this.gameboard[0] === this.gameboard[4] && this.gameboard[4] === this.gameboard[8]))
        ||
      ((this.gameboard[4] === "X" || this.gameboard[4] === "O") && (this.gameboard[2] === this.gameboard[4] && this.gameboard[4] === this.gameboard[6]))
        ||
      ((this.gameboard[3] === "X" || this.gameboard[3] === "O") && (this.gameboard[0] === this.gameboard[3] && this.gameboard[3] === this.gameboard[6]))
      ||
      ((this.gameboard[4] === "X" || this.gameboard[4] === "O") && (this.gameboard[1] === this.gameboard[4] && this.gameboard[4] === this.gameboard[7]))
      ||
      ((this.gameboard[5] === "X" || this.gameboard[5] === "O") && (this.gameboard[2] === this.gameboard[5] && this.gameboard[5] === this.gameboard[8]))

    ) {
      return true;
    } else {
      return false;
    }
  }

  printGameWon = () => {
    console.log("Game has been won!");
    process.exit();
  }

}