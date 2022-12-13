import { indexRelative } from "../utils/workingFolder.ts";



const input = await Deno.readTextFile(indexRelative("input.txt"));

// const path = traverseGrid(new Grid(input), "S", "E");
const grid = new Grid(input);
const cost = grid.rankSquares("E", "S");
//console.log("part 1:", path, path && path.length -1);
console.log("part 1:", cost);
console.log("part 2:", grid.lowestRankForInput("E", "a"));



