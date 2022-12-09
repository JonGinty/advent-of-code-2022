import { splitByLine } from "../01/splitByLine.ts";




export function readCommand(input: string): command {
    const [d, distanceString] = input.split(" ");
    if (!(d in dc)) throw new Error(`Expected direction to be one of [${Object.keys(dc).join(",")}], got ${d}`);
    const distance = parseInt(distanceString);
    if (isNaN(distance)) throw new Error(`Expected distance to be a number, got ${distanceString}`);
    return {
        direction: d as direction,
        distance
    }
}

export function readCommands(input: string): command[] {
    const lines = splitByLine(input);
    return lines.map(l => readCommand(l));
}


export type command = {
    direction: direction;
    distance: number;
}

export class DirectionCommand {
    R: (pos: xy) => xy = (pos: xy) => [pos[0] + 1, pos[1]];
    L: (pos: xy) => xy = (pos: xy) => [pos[0] - 1, pos[1]];
    U: (pos: xy) => xy = (pos: xy) => [pos[0], pos[1] + 1];
    D: (pos: xy) => xy = (pos: xy) => [pos[0], pos[1] - 1];
}
export const dc = new DirectionCommand();
export type direction = keyof(DirectionCommand);


export type xy = [number, number]

export function xyDiff(a: xy, b: xy, abs = false) {
    const result = [a[0] - b[0], a[1] - b[1]];
    return abs ? [Math.abs(result[0]), Math.abs(result[1])] : result;
}

export function buildXyArray(length: number): xy[] {
    const arr: xy[] = [];
    for (let i = 0; i < length; i++) {
        arr.push([0,0]);
    }
    return arr;
}
