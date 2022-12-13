import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { Grid, p } from "./gridtools.ts";

const gridString = 
`Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`

Deno.test("reading grid", () => {
    const grid = new Grid(gridString);
    assertEquals(grid.getChar(p(0,0)), "S");
    assertEquals(grid.getChar(p(1,4)), "y");
    assertEquals(grid.getChar(p(4,7)), "i");

    const s1 = grid.getSurroundingChars(p(0,7));
    assertEquals(s1.map(s => s.char), ["l", "n"]);

    const s2 = grid.getSurroundingChars(p(1,1));
    assertEquals(s2.map(s => s.char), ["c", "c", "a", "a"]);

    const s3 = grid.getSurroundingChars(p(4,7));
    assertEquals(s3.map(s => s.char), ["j", "h"]);


    assertEquals(grid.findChar("a"), p(0,1));
    assertEquals(grid.findChar("S"), p(0,0));

    assertEquals(grid.findChar("E"), p(5,2));
    
})