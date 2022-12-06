import { indexRelative } from "../utils/workingFolder.ts";
import { splitByLine } from "../01/splitByLine.ts";
import { charVal, findCommonCharsBetweenLines, valueOfCommonItemsForFullInput } from "./stringManipulation.ts";

const input = await Deno.readTextFile(indexRelative("input.txt"));



let total = 0;
let lines = splitByLine(input);

for (let i = 0; i < lines.length; i += 3) {
    total += charVal(findCommonCharsBetweenLines([lines[i], lines[i+1], lines[i+2]]));
}

console.log(total);