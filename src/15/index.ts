import { gridRange } from "../utils/grid.ts";
import { indexRelative } from "../utils/workingFolder.ts";
import { buildSingleRowRenderer, countEmptySquares, determineFullRange, getAllOffBy1Squares, readGridFromInput, readRangesFromInput, showScannedSquares, square } from "./tunneltools.ts";

const input = await Deno.readTextFile(indexRelative("input.txt"));

const grid = readGridFromInput(input);
//showScannedSquares(grid);
// const row = grid.draw({customRange: {...r, minY: 10, maxY: 10}, noOutput: true});
// const count = [...row].filter(p => p === "#").length;
// //grid.draw()

const distances = readRangesFromInput(input);

// // PART 1 is slow, uncomment for it
// const fullRange = determineFullRange(distances);
// const r = { ...fullRange, minY: 2000000, maxY: 2000000 };

// const count = countEmptySquares(grid, r, distances)

// console.log("part 1", count);

const p2Range: gridRange = {
    minX: 0,
    maxX: 4000000,
    minY: 0,
    maxY: 4000000,
}

const offby1count = getAllOffBy1Squares(distances, p2Range);
//const offby1count = getAllOffBy1Squares(distances, grid.getRange())
const n = (offby1count!.x * 4000000) + offby1count!.y
//const getAllOffByNSquares(distances: )

console.log("part 2", offby1count);
console.log("part 2", n);
