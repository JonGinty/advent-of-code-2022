import { indexRelative } from "../utils/workingFolder.ts";
import { buildTotals } from "./buildTotals.ts";
import { splitByLine } from "./splitByLine.ts";

const text = await Deno.readTextFile(indexRelative("input.txt"));

const list = splitByLine(text);
const totals = buildTotals(list);
let [first, second, third] = [0,0,0];
totals.forEach(total => {
    if (total > first) {
        third = second;
        second = first;
        first = total;
    } else if (total > second) {
        third = second;
        second = total;
    } else if (total > third) {
        third = total;
    }
});
console.log(first + second + third);