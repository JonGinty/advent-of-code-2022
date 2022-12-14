import { indexRelative } from "../utils/workingFolder.ts";
import { addFloorToGrid, buildGrid, drawGrid, fillWithSand, inputRange, readLines, xy } from "./pathtools.ts";

const input = await Deno.readTextFile(indexRelative("input.txt"));
const startPoint: xy = [500,0];
const g = buildGrid(readLines(input), startPoint);
const g2 = buildGrid(readLines(input), startPoint);
drawGrid(g.grid);
const sand = fillWithSand(g.grid, g.range, startPoint)




addFloorToGrid(g2.grid);
const sand2 = fillWithSand(g2.grid, g2.range, startPoint);
await Deno.writeTextFile(indexRelative("out.txt"), sand2.lastGrid);




console.log("part 1: ", sand.sand);
console.log("part 2: ", sand2.sand);