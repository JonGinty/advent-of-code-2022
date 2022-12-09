import { indexRelative } from "../utils/workingFolder.ts";
import { buildXyArray, direction, readCommands } from "./inputTools.ts";
import { countVisited, move, prettyPrintSet, state } from "./movement.ts";


const input = await Deno.readTextFile(indexRelative("input.txt"));
const commands = readCommands(input);


let s: state = {
    tVisited: new Set(),
    knots: buildXyArray(2)
}
commands.forEach(c => s = move(c, s));
//prettyPrintSet(s.tVisited);
console.log("part 1:", countVisited(s.tVisited));


let s2: state = {
    tVisited: new Set(),
    knots: buildXyArray(10)
}
commands.forEach(c => s2 = move(c, s2));
console.log("part 2:", countVisited(s2.tVisited));
