import { applyMovesToStacks, applyMoveToStacks, readMoves, readStacks, readTopItems } from "./crateTools.ts";
import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { splitByLine } from "../01/splitByLine.ts";


const input =
`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

Deno.test("reading stacks", () => {
    const lines = splitByLine(input);
    const stacks = readStacks(lines);
    assertEquals(stacks.length, 3);
    assertEquals(stacks[0].length, 2);
    assertEquals(stacks[1].length, 3);
    assertEquals(stacks[2].length, 1);
    assertEquals(stacks[0][0], "Z");
    assertEquals(stacks[1][2], "D");

});

Deno.test("reading moves", () => {
    const lines = splitByLine(input);
    const moves = readMoves(lines);
    assertEquals(moves.length, 4);
    assertEquals(moves[0].move, 1);
    assertEquals(moves[0].from, 2);
    assertEquals(moves[0].to, 1);
})

Deno.test("applying moves", () => {
    const lines = splitByLine(input);
    const moves = readMoves(lines);
    const stacks = readStacks(lines);
    applyMovesToStacks(stacks, moves);
    assertEquals(stacks.length, 3);
    assertEquals(stacks[0].length, 1);
    assertEquals(stacks[1].length, 1);
    assertEquals(stacks[2].length, 4);
    assertEquals(stacks[0][0], "M");
    assertEquals(stacks[2][3], "D");

    assertEquals(readTopItems(stacks), "MCD");
})
