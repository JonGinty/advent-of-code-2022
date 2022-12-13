import { indexRelative } from "../utils/workingFolder.ts";
import { Grid, traverseGrid } from "./gridtools.ts";


const input = await Deno.readTextFile(indexRelative("input.txt"));

const path = traverseGrid(new Grid(input), "S", "E");

console.log("part 1:", path, path && path.length -1);
console.log("part 2:", 2);
