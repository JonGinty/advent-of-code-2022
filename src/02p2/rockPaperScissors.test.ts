import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getPlayerMove, calculateScore, calculateTotalScore } from "./rockPaperScissors.ts"

Deno.test("rock paper scissors score calculator", () => {
    assertEquals(calculateScore("B", "Y"), 3 + 2);
    assertEquals(calculateScore("B", "X"), 0 + 1);
    assertEquals(calculateScore("B", "Z"), 6 + 3);
    assertEquals(calculateScore("A", "Y"), 3 + 1);
    assertEquals(calculateScore("A", "X"), 0 + 3);
    assertEquals(calculateScore("A", "Z"), 6 + 2);
    assertEquals(calculateScore("C", "Y"), 3 + 3);
    assertEquals(calculateScore("C", "X"), 0 + 2);
    assertEquals(calculateScore("C", "Z"), 6 + 1);
});

Deno.test("rock paper scissors player moves", () => {
    assertEquals(getPlayerMove("paper", "win"), "scissors");
    assertEquals(getPlayerMove("paper", "lose"), "rock");
    assertEquals(getPlayerMove("paper", "draw"), "paper");
    assertEquals(getPlayerMove("rock", "win"), "paper");
    assertEquals(getPlayerMove("rock", "lose"), "scissors");
    assertEquals(getPlayerMove("rock", "draw"), "rock");
    assertEquals(getPlayerMove("scissors", "win"), "rock");
    assertEquals(getPlayerMove("scissors", "lose"), "paper");
    assertEquals(getPlayerMove("scissors", "draw"), "scissors");
})

Deno.test("multi round score calculation", () => {
    let rounds = [
        "A Y",
        "B X",
        "C Z"
    ]
    assertEquals(calculateTotalScore(rounds), 12);
})