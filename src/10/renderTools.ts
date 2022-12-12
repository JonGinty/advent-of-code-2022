import { cycle } from "./signalutils.ts";



const rowSize = 40;

export function render(cycles: cycle[]) {
    let output = "";
    for (let i = 0; i < cycles.length; i++) {
        if (i % rowSize === 0) output += "\n";
        const c = cycles[i];
        output += isVisible(c, i) ? "#" : ".";
    }
    console.log(output);
}


export function isVisible(c: cycle, i: number) {
    const currentPosition = (i % rowSize);
    return (Math.abs(c.X - currentPosition) < 2);
}