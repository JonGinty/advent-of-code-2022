import { indexRelative } from "../utils/workingFolder.ts";
import { splitByLine } from "../01/splitByLine.ts";
import { checkOverlapForFullLineInput } from "./rangeTools.ts";


const input = await Deno.readTextFile(indexRelative("input.txt"));

const lines = splitByLine(input);
let total = 0;
lines.forEach(l => {
    if (checkOverlapForFullLineInput(l)) total++;
});

console.log(total);