import { indexRelative } from "../utils/workingFolder.ts";
import { evaluateRounds, readMonkeyArrayFromInput } from "./monkeytools.ts";


const input = await Deno.readTextFile(indexRelative("input.txt"));

const monkeys = readMonkeyArrayFromInput(input);
evaluateRounds(monkeys, 20);
let top = 0, second = 0;
monkeys.forEach(m => {
    if (m.itemsInspected > top) {
        second = top;
        top = m.itemsInspected;
    } else if (m.itemsInspected > second) {
        second = m.itemsInspected
    }
})

console.log("part 1:", top, second, top * second);


