
import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { countVisible, evaluateScore, readGrid, scoreDirections } from "./gridTools.ts";


Deno.test("reading grid", () => {
    const input =
`12345678
91234567
89123456`

    const grid = readGrid(input);
    assertEquals(grid.length, 3);
    assertEquals(grid[0].length, 8);
    assertEquals(grid[1].length, 8);
    assertEquals(grid[2].length, 8);
    assertEquals(grid[0][0], 1);
    assertEquals(grid[2][7], 6);
});

Deno.test("count visible", () => {
    const input =
`30373
25512
65332
33549
35390`

    const grid = readGrid(input);
    const score = scoreDirections(grid, 1, 2);
    assertEquals(score.up, 1);
    assertEquals(score.left, 1);
    assertEquals(score.right, 2);
    assertEquals(score.down, 2);
    assertEquals(evaluateScore(score), 4);
});