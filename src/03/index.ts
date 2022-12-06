import { indexRelative } from "../utils/workingFolder.ts";
import { splitByLine } from "../01/splitByLine.ts";
import { valueOfCommonItemsForFullInput } from "./stringManipulation.ts";

const input = await Deno.readTextFile(indexRelative("input.txt"));

const result = valueOfCommonItemsForFullInput(input);

console.log(result);