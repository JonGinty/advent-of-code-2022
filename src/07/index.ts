import { indexRelative } from "../utils/workingFolder.ts";
import { executeAllCommands, getSizes } from "./dirTools.ts";

// this one was not good!
const input = await Deno.readTextFile(indexRelative("input.txt"));
const dir = executeAllCommands(input);
const sizes = getSizes(dir);
const smallSizes = sizes.filter(s => s.size < 100000);

const total = (smallSizes as {size: number}[]).reduce((previous, current) => {return {size: previous.size + current.size}})

console.log(total); 