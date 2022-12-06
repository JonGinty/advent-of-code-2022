import { indexRelative } from "../utils/workingFolder.ts";
import { findUniqueStringLocation } from "./stringTools.ts";

const input = await Deno.readTextFile(indexRelative("input.txt"));

// console.log(findUniqueStringLocation(input)); // part 1
console.log(findUniqueStringLocation(input, 14)); // part 2