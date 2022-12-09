import { indexRelative } from "../utils/workingFolder.ts";
import { direction, readCommands } from "./inputTools.ts";
import { countVisited, move, state } from "./movement.ts";


const input = await Deno.readTextFile(indexRelative("input.txt"));
const commands = readCommands(input);
let s: state = {
    tVisited: new Set(),
    t: [0,0],
    h: [0,0]
}
commands.forEach(c => s = move(c, s));

console.log("part 1:", countVisited(s.tVisited));
