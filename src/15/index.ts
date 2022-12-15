import { indexRelative } from "../utils/workingFolder.ts";
import { readGridFromInput, showScannedSquares } from "./tunneltools.ts";

const input = await Deno.readTextFile(indexRelative("input.txt"));

const grid = readGridFromInput(input);
showScannedSquares(grid);
const r = grid.getRange();
const row = grid.draw({customRange: {...r, minY: 10, maxY: 10}, noOutput: true});
const count = [...row].filter(p => p === "#").length;
//grid.draw()
console.log("part 1", count);
console.log("part 2", 2);
