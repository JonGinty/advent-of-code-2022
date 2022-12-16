
import { indexRelative } from "../utils/workingFolder.ts";
import { buildRecordForValves, readValvesFromInput, valveScore } from "./valvetools.ts";

const input = await Deno.readTextFile(indexRelative("input.txt"));
const valves = readValvesFromInput(input);
const score =  valveScore(["AA", "AA"], buildRecordForValves(valves),  [], 26)


console.log("part 2", score);
