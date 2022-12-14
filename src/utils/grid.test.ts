import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { Grid } from "./grid.ts";


function addSomeData(grid: Grid<string>){
    grid.setItem(1,1,"a");
    grid.setItem(3,2,"b");
    grid.setItem(6,7,"c");
    grid.setItem(8,9,"d");
    grid.setItem(13,10,"e");
    grid.setItem(2,1,"f");
    grid.setItem(-1,11,"g");
    grid.setItem(-7,-1,"h");
    grid.setItem(3,1,"i");
    grid.setItem(4,2,"j");
}

const someDataString = 
`h....................
.....................
........afi..........
..........bj.........
.....................
.....................
.....................
.....................
.............c.......
.....................
...............d.....
....................e
......g..............`

Deno.test("Grid get and set", () => {
    const g = new Grid<string>();
    g.setItem(1,1,"a");
    g.setItem(2,5,"b");
    assertEquals(g.getItem(1,1), "a");
    assertEquals(g.getItem(2,5), "b");
    assertEquals(g.getItem(1,6), undefined);
})

Deno.test("Grid range", () => {
    const g = new Grid<string>();
    addSomeData(g);
    assertEquals(g.getRange(), {
        minX: -7,
        minY: -1,
        maxX: 13,
        maxY: 11
    })
});

Deno.test("Grid draw", () => {
    const g = new Grid<string>();
    addSomeData(g);
    assertEquals(g.draw(), someDataString);
});


Deno.test("Grid parse numbers", () => {
    const inp = 
`123  4  7
  9  1 x3
`

const exp = 
`123..4..7
..9..1..3`
    const g = new Grid();
    g.parse(inp, {valueExtractor: Grid.defaultValueExtractorForInt});
    assertEquals(g.draw(), exp);
});

Deno.test("Grid parse string", () => {
    const inp = 
`abc   
d e   f h
i j k
l       m`

const exp = 
`abc......
d.e...f.h
i.j.k....
l.......m`
    const g = new Grid();
    g.parse(inp);
    assertEquals(g.draw(), exp);
});