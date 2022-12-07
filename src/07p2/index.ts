import { indexRelative } from "../utils/workingFolder.ts";
import { executeAllCommands, getSizes } from "./dirTools.ts";

// I'm sorry!
const input = await Deno.readTextFile(indexRelative("input.txt"));
const dir = executeAllCommands(input);
const sizes = getSizes(dir);

const totalSpace = 70000000;
const requiredSpace = 30000000;
const totalUsed = sizes[0].size;
const totalFree = totalSpace - totalUsed;
const toFree = requiredSpace - totalFree;

let currentMin = sizes[0];
sizes.forEach(s => {
    if (s.size < toFree) return;
    if (s.size > currentMin.size) return;
    currentMin = s;
})

console.log({
    totalSpace,
    requiredSpace,
    totalFree,
    toFree
}); 

console.log(currentMin);