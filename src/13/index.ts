import { p } from "../12/gridtools.ts";
import { indexRelative } from "../utils/workingFolder.ts";
import { compare, readPair, item, c } from "./packetTools.ts";



const input = await Deno.readTextFile(indexRelative("input.txt"));
const pairs = input.split("\n\n");
const read = pairs.map(readPair)


const result = read.map(p => (compare(p.left, p.right) ? 1 : 0) as number).reduce((p, c, i) => (p + (c * (i+1))));

console.log("part 1:", result);


const all = read.map(p => [p.left, p.right]).flat(1);
const ld = [[6]];
const rd = [[2]];

all.push(ld);
all.push(rd);

all.sort((l, r) => {
    const res = compare(l, r);
    if (res) return -1;
    if (res === null) return 0;
    return 1;
});

console.log("part 2:", (all.indexOf(ld) + 1) * (all.indexOf(rd) + 1));



