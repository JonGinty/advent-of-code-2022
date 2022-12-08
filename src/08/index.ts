import { indexRelative } from "../utils/workingFolder.ts";
import { countVisible, maxScore, readGrid } from "./gridTools.ts";

console.log("Happy birthday Jonji!");

const input = await Deno.readTextFile(indexRelative("input.txt"));
const grid = readGrid(input);

console.log("part 1:", countVisible(grid));

console.log("part 2:", maxScore(grid));
