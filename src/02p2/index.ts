import { indexRelative } from "../utils/workingFolder.ts";
import { splitByLine } from "../01/splitByLine.ts";
import { calculateTotalScore } from "./rockPaperScissors.ts";

const input = await Deno.readTextFile(indexRelative("input.txt"));
const rounds = splitByLine(input);

const score = calculateTotalScore(rounds);

console.log(score);