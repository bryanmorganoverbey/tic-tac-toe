import { AiAgent } from "../src/AIAgent";
import { describe, it, expect } from "vitest"


describe('AiAgent test', () => {

  it('sucessfully constucts new AI Agent', () => {
    // set hour within business hours
    const agent = new AiAgent("X");
    // access Date.now() will result in the date set above
    expect(agent.ourChar).toEqual("X")
    expect(agent.opponentChar).toEqual("O")
  })

  it('Decides correctly to run a defensive move on a row', () => {
    const agent = new AiAgent("X");
    const gameboard = ["O", "O", " ", " ", " ", " ", " ", " ", " "]
    expect(agent.nextMove(gameboard)).toEqual(["O", "O", "X", " ", " ", " ", " ", " ", " "])
  })

  it('Decides correctly to run a defensive move on a column', () => {
    const agent = new AiAgent("X");
    const gameboard = ["O", " ", " ", "O", " ", " ", " ", " ", " "]
    expect(agent.nextMove(gameboard)).toEqual(["O", " ", " ", "O", " ", " ", "X", " ", " "])
  })

  it('Decides correctly to run a defensive move on a diagonal', () => {
    const agent = new AiAgent("X");
    const gameboard = ["O", " ", " ", " ", "O", " ", " ", " ", " "]
    expect(agent.nextMove(gameboard)).toEqual(["O", " ", " ", " ", "O", " ", " ", " ", "X"])
  })

  it('Decides correctly to run an offensive move, taking the middle square when the board is clear', () => {
    const agent = new AiAgent("X");
    const gameboard = [" ", " ", " ", " ", " ", " ", " ", " ", " "]
    expect(agent.nextMove(gameboard)).toEqual([" ", " ", " ", " ", "X", " ", " ", " ", " "])
  })

  it('Decides correctly to run an offensive move, completing a row sequence to win the game although the opponent has 2 in a row', () => {
    const agent = new AiAgent("X");
    const gameboard = ["O", " ", "O", "X", " ", "X", " ", " ", " "]
    expect(agent.nextMove(gameboard)).toEqual(["O", " ", "O", "X", "X", "X", " ", " ", " "])
  })

  it('Decides correctly to run an offensive move, completing a column sequence to win the game although the opponent has 2 in a row', () => {
    const agent = new AiAgent("X");
    const gameboard = ["O", " ", "X", "O", " ", "X", " ", " ", " "]
    expect(agent.nextMove(gameboard)).toEqual(["O", " ", "X", "O", " ", "X", " ", " ", "X"])
  })
})