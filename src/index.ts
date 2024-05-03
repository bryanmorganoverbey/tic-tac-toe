import * as readline from "readline";
import Game from "./Game"
import { AiAgent } from "./AIAgent";
// Determine if we are playing with AI vs AI, or One Player vs AI.
let numPlayers: number = 0;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log("\n\n\n\n");
rl.question('What type of gameplay would you like?\n Enter 0 for AI vs AI, \
or enter 1 for human vs. AI.\n\n\n', (answer) => {
    switch(answer.toLowerCase()) {
      case '0':
        numPlayers = 0;
        console.log('Great! Starting your game with AI vs AI');
        break;
      case '1':
        numPlayers = 1;
        console.log('Awesome! Starting your game with Human vs AI');
        break;
      default:
        console.log('Invalid answer!');
        process.exit();
    }
  const game = new Game();
  game.printGameBoard();
  const agent1 = new AiAgent("X");
  const agent2 = numPlayers === 0 ? new AiAgent("O") : null;

  const gameLoop = () => {
    // It's the AI Agent 1's turn
    if (game.whosTurn === "player1") {
      game.gameboard = agent1.nextMove(game.gameboard);
      console.log("AI Agent 1 Played:\n")
      game.printGameBoard();
      game.movesMade++;
      game.whosTurn = "player2";
      if (game.movesMade < 9 && !game.winnerDetermined()) {
        gameLoop();
      } else if (!game.winnerDetermined() && game.movesMade === 9) {
        console.log("Game is a draw!");
        process.exit();
      } else { game.printGameWon() }
    } else if (numPlayers === 1) {
      // Human's turn
      rl.question('Enter a number 0 through 9 to place your next move.\n', (answer: string) => {
        if (answer < "0" || answer > "9") {
          console.log("Error. Please enter a number 1 .. 8.");
          process.exit();
        }
        const idx = parseInt(answer);
        game.gameboard = game.gameboard.slice(0, idx).concat("O", game.gameboard.slice(idx + 1));
        console.log('You played:\n')
        game.printGameBoard();
        game.movesMade++;
        game.whosTurn = "player1"
      if (game.movesMade < 9 && !game.winnerDetermined()) {
        gameLoop();
      } else if (!game.winnerDetermined() && game.movesMade === 9) {
        console.log("Game is a draw!");
        process.exit();
      } else { game.printGameWon() }
      })
    } else {
      // AI Agent 2's turn
      game.gameboard = agent2.nextMove(game.gameboard);
      console.log("AI Agent 2 Played:\n")
      game.printGameBoard();
      game.movesMade++;
      game.whosTurn = "player1";
      if (game.movesMade < 9 && !game.winnerDetermined()) {
        gameLoop();
      } else if (!game.winnerDetermined() && game.movesMade === 9) {
        console.log("Game is a draw!");
        process.exit();
      } else { game.printGameWon() }
    }
  }

  gameLoop();

});


