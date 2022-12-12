import { indexRelative } from "../utils/workingFolder.ts";
import { render } from "./renderTools.ts";
import { cycle, getCommandsFromInput, getSumOfCycleValues, runComands } from "./signalutils.ts";


const input = await Deno.readTextFile(indexRelative("input.txt"));
const cycles = runComands(getCommandsFromInput(input));



const sum = getSumOfCycleValues([
    20,
    60,
    100,
    140,
    180,
    220
], cycles)



//prettyPrintSet(s.tVisited);
console.log("part 1:", sum);

console.log("part 2:");

render(cycles);
