import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getResult, calculateScore, calculateTotalScore } from "./rockPaperScissors.ts"

Deno.test("rock paper scissors score calculator", () => {
    assertEquals(calculateScore("B", "Y"), 5);
    assertEquals(calculateScore("B", "X"), 1);
    assertEquals(calculateScore("B", "Z"), 9);
    assertEquals(calculateScore("A", "Y"), 8);
    assertEquals(calculateScore("A", "X"), 4);
    assertEquals(calculateScore("A", "Z"), 3);
    assertEquals(calculateScore("C", "Y"), 2);
    assertEquals(calculateScore("C", "X"), 7);
    assertEquals(calculateScore("C", "Z"), 6);
});

Deno.test("rock paper scissors win rules", () => {
    assertEquals(getResult("paper", "paper"), "draw");
    assertEquals(getResult("paper", "rock"), "lose");
    assertEquals(getResult("paper", "scissors"), "win");
    assertEquals(getResult("rock", "paper"), "win");
    assertEquals(getResult("rock", "rock"), "draw");
    assertEquals(getResult("rock", "scissors"), "lose");
    assertEquals(getResult("scissors", "paper"), "lose");
    assertEquals(getResult("scissors", "rock"), "win");
    assertEquals(getResult("scissors", "scissors"), "draw");
})

Deno.test("multi round score calculation", () => {
    let rounds = [
        "A Y",
        "B Z",
        "C X"
    ]
    assertEquals(calculateTotalScore(rounds), 24);
})