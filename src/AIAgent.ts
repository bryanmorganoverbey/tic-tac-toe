export class AiAgent {
  public ourChar;
  public opponentChar;
  constructor(charToUse: string) {
    this.ourChar = charToUse;
    this.opponentChar = charToUse === "X" ? "O" : "X";
  }

  // method for AI to process current board and provide a response.
  private createAnalysisArrays = (currentBoard: string[]) => {
    const row1 = currentBoard.slice(0, 3)
    const row2 = currentBoard.slice(3, 6)
    const row3 = currentBoard.slice(6)
    const col1 = [currentBoard[0], currentBoard[3], currentBoard[6]]
    const col2 = [currentBoard[1], currentBoard[4], currentBoard[7]]
    const col3 = [currentBoard[2], currentBoard[5], currentBoard[8]]
    const diagonal1 = [currentBoard[0], currentBoard[4], currentBoard[8]]
    const diagonal2 = [currentBoard[2], currentBoard[4], currentBoard[6]]
    return [row1, row2, row3, col1, col2, col3, diagonal1, diagonal2];
  }

  // The AI needs to determine if it should run a defensive or offensive strategy
  public nextMove(currentBoard: string[]) {
    // break the board down into 3 rows, 3 columns, and 2 diagnals.
    const analysisArrays = this.createAnalysisArrays(currentBoard);

    // determine if there is anywhere the we already have 2 in a sequence, and can win with a 3rd.
    let indexOf2InSequence = null;
    analysisArrays.map((arry, idx) => {
      const opponentCharCountArray = arry;
      const ourCharCountArray = arry;
      if (ourCharCountArray.filter((i) => i === this.ourChar).length == 2 && opponentCharCountArray.filter((i) => i === this.opponentChar).length === 0) {
        indexOf2InSequence = idx;
      }
    })
    // determine if opponent already has 2 in a sequence where we have not blocked.
    let indexOf2InOppSequence = null;
    let emptyIndexOfDefendingArray;
    analysisArrays.map((arry, idx) => {
      const opponentCharCountArray = arry;
      const ourCharCountArray = arry;
      if (opponentCharCountArray.filter((i) => i === this.opponentChar).length > 1 && ourCharCountArray.filter((i) => i === this.ourChar).length === 0) {
        indexOf2InOppSequence = idx;
        emptyIndexOfDefendingArray = arry.indexOf(' '); // 0, 1, or 2
      }
    })
    // if we have 2 in sequence, go ahead and win the game:
    if (indexOf2InSequence !== null) {
      return this.runOffensiveMove( currentBoard, indexOf2InSequence);
    } else if (indexOf2InOppSequence !== null) {
      return this.runDefensiveMove( currentBoard, indexOf2InOppSequence, emptyIndexOfDefendingArray);
    } else {
      return this.runOffensiveMove( currentBoard, indexOf2InSequence);
    }
  }

  private runDefensiveMove( currentBoard: string[], indexOf2InOppSequence: number, emptyIndexOfDefendingArray: number) {
    console.log('running defensive strategy\n')
    // opponent has 2 in a sequence. Block them with our char
    switch (indexOf2InOppSequence) {
      case 0:
        console.log('AI will block row 1\n')
        if (emptyIndexOfDefendingArray === 0) {
          return [this.ourChar].concat(currentBoard.slice(1));
        } else if (emptyIndexOfDefendingArray === 1) {
          return [this.opponentChar, this.ourChar].concat(currentBoard.slice(2));
        } else {
          return [this.opponentChar, this.opponentChar, this.ourChar].concat(currentBoard.slice(3));
        }
      case 1:
        console.log('AI will block row 2\n');
        if (emptyIndexOfDefendingArray === 0) {
          return currentBoard.slice(0, 3).concat([this.ourChar], currentBoard.slice(4));
        } else if (emptyIndexOfDefendingArray === 1) {
          return currentBoard.slice(0, 4).concat([this.ourChar], currentBoard.slice(5));
        } else {
          return currentBoard.slice(0,5).concat([this.ourChar], currentBoard.slice(6));
        }
      case 2:
        console.log('AI will block row 3\n');
        if (emptyIndexOfDefendingArray === 0) {
          return currentBoard.slice(0, 6).concat([this.ourChar], currentBoard.slice(7));
        } else if (emptyIndexOfDefendingArray === 1) {
          return currentBoard.slice(0, 7).concat([this.ourChar], currentBoard.slice(8));
        } else {
          return currentBoard.slice(0, 8).concat([this.ourChar])
        }
      case 3:
        console.log('AI will block col 1\n');
        if (emptyIndexOfDefendingArray === 0) {
          return [this.ourChar].concat(currentBoard.slice(1));
        } else if (emptyIndexOfDefendingArray === 1) {
          return currentBoard.slice(0, 3).concat([this.ourChar], currentBoard.slice(4));
        } else {
          return currentBoard.slice(0, 6).concat([this.ourChar], currentBoard.slice(7));
        }
      case 4:
        console.log('AI will block col 2\n');
        if (emptyIndexOfDefendingArray === 0) {
          return currentBoard.slice(0, 1).concat([this.ourChar]).concat(currentBoard.slice(2));
        } else if (emptyIndexOfDefendingArray === 1) {
          return currentBoard.slice(0, 4).concat([this.ourChar]).concat(currentBoard.slice(5));
        } else {
          return currentBoard.slice(0, 7).concat([this.ourChar], currentBoard.slice(8));
        }
      case 5:
        console.log('AI will block col 3\n');
        if (emptyIndexOfDefendingArray === 0) {
          return currentBoard.slice(0, 2).concat([this.ourChar]).concat(currentBoard.slice(3));
        } else if (emptyIndexOfDefendingArray === 1) {
          return currentBoard.slice(0, 5).concat([this.ourChar]).concat(currentBoard.slice(6));
        } else {
          return currentBoard.slice(0, 8).concat([this.ourChar]);
        }
      case 6:
        console.log('AI will block top left to bottom right diagonal\n');
        if (emptyIndexOfDefendingArray === 0) {
          return [this.ourChar].concat(currentBoard.slice(1));
        } else if (emptyIndexOfDefendingArray === 1) {
          return currentBoard.slice(0, 4).concat([this.ourChar],currentBoard.slice(5));
        } else {
          return currentBoard.slice(0, 8).concat([this.ourChar]);
        }
      case 7:
        console.log('AI will block top right to bottom left diagonal\n');
        if (emptyIndexOfDefendingArray === 0) {
          return currentBoard.slice(0,2).concat([this.ourChar], currentBoard.slice(3));
        } else if (emptyIndexOfDefendingArray === 1) {
          return currentBoard.slice(0, 4).concat([this.ourChar],currentBoard.slice(5));
        } else {
          return currentBoard.slice(0, 6).concat([this.ourChar],currentBoard.slice(7));
        }
      default:
        return currentBoard;
    }
  }

  private runOffensiveMove( currentBoard: string[], indexOf2InSequence: number | null) {
    console.log('running offensive strategy\n')
    if (typeof indexOf2InSequence === 'number') {
      switch (indexOf2InSequence) {
        case 0:
          console.log('first row ')
          return [this.ourChar, this.ourChar, this.ourChar].concat(currentBoard.slice(3));
        case 1:
          console.log('second row')
          return currentBoard.slice(0, 3).concat([this.ourChar, this.ourChar, this.ourChar]).concat(currentBoard.slice(6));
        case 2:
          console.log('third row');
          return currentBoard.slice(0, 6).concat([this.ourChar, this.ourChar, this.ourChar]);
        case 3:
          console.log('column 1');
          return [this.ourChar].concat(currentBoard.slice(1, 3)).concat([this.ourChar]).concat(currentBoard.slice(4, 6)).concat([this.ourChar]).concat(currentBoard.slice(7))
        case 4:
          console.log('column 2');
          return [currentBoard[0]].concat([this.ourChar], currentBoard.slice(2, 4), [this.ourChar], currentBoard.slice(5, 7), [this.ourChar], currentBoard.slice(8));
        case 5:
          console.log('column 3');
          return currentBoard.slice(0, 2).concat([this.ourChar]).concat(currentBoard.slice(3, 5)).concat([this.ourChar]).concat(currentBoard.slice(6, 8)).concat([this.ourChar]);
        case 6:
          console.log('top left to bottom right diagonal')
          return [this.ourChar].concat(currentBoard.slice(1, 4)).concat([this.ourChar]).concat(currentBoard.slice(5, 8)).concat([this.ourChar]);
        case 7:
          console.log('top right to bottom left diagonal');
          return currentBoard.slice(0, 2).concat([this.ourChar]).concat(currentBoard.slice(3, 4)).concat([this.ourChar]).concat(currentBoard.slice(5, 6)).concat([this.ourChar]).concat(currentBoard.slice(7));
        default:
          return currentBoard;
      }
    } else if (currentBoard[4] === ' ') {
      // if the middle is not taken, take it.
      console.log("middle not taken. taking middle spot \n")
      return currentBoard.slice(0, 4).concat(this.ourChar).concat(currentBoard.slice(5));
    } else {
      // otherwise, choose a random unfilled spot for the AI move
      console.log("placing char in random spot \n")
      let foundEmptyLocation = false
      while (!foundEmptyLocation) {
        // choose a random # from 0..8
        const idx = Math.floor(Math.random() * 9)
        // return the board with our AI's move done at a random empty spot
        if (currentBoard[idx] === ' ') {
          foundEmptyLocation = true;
          return currentBoard.slice(0, idx).concat(this.ourChar).concat(currentBoard.slice(idx === 8 ? 8 : idx + 1))
        }
      }
    }

  }
}