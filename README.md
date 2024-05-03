# tic-tac-toe

A node app, run in the console, which plays a tic-tac-toe game.

## How to play

To start the gameplay, clone the repo and change directory into the repo. Begin the game by running 'npm run start'.

The game will ask if you want to play vs the AI, or if you want the AI to play itself. Choose '1' to play against the AI, or '0' to see it play itself.

For Human vs AI, the game board is set up as follows:

    0 | 1 | 2
  -------------
    3 | 4 | 5
  -------------
    6 | 7 | 8

You choose your move by entering a number 0..8 for which square you would like to play.

## testing

To run the test suite, cd into the project directory and run "npm run test".
The tests are using vitest: <https://vitest.dev/guide/>
