import { indexRelative } from "../utils/workingFolder.ts";
import { splitByLine } from "../01/splitByLine.ts";
import { applyMovesToStacks, readMoves, readStacks, readTopItems } from "./crateTools.ts";


const input = await Deno.readTextFile(indexRelative("input.txt"));

const lines = splitByLine(input);
const stacks = readStacks(lines);
const moves = readMoves(lines);
applyMovesToStacks(stacks, moves);

console.log(readTopItems(stacks));