import { splitByLine } from "../01/splitByLine.ts";


export function readLine(line: string): xy[] {
    return line.split(" -> ").map(s => s.split(",").map(i => parseInt(i)) as xy);
}

export function readLines(input: string): xy[][] {
    return splitByLine(input).map(line => readLine(line));
}

export function inputRange(input: xy[][], startPoint?: xy): xyRange {
    const ins = startPoint ? [...input.flat(1), startPoint] : input.flat(1);
    return {
        min: [
            ins.map(i => i[0]).reduce((p, c) => Math.min(p, c)),
            ins.map(i => i[1]).reduce((p, c) => Math.min(p, c))
        ],
        max: [
            ins.map(i => i[0]).reduce((p, c) => Math.max(p, c)),
            ins.map(i => i[1]).reduce((p, c) => Math.max(p, c))
        ]
    }
}


export function buildGrid(input: xy[][], startPoint?: xy): {grid: grid, range: xyRange} {
    const range = inputRange(input, startPoint);
    const grid: grid = [];
    for (let i = 0; i <= range.max[1] + 1; i++) {
        grid[i] = new Array(range.max[0] + 1000).fill(".") // ok, I've learned my lesson, no more 2d arrays for grids...
    }

    input.forEach(cSet => {
        cSet.reduce((p, c) => {
            // // console.log(p, c);
            if (p[0] === c[0]) {
                //// console.log("match x")
                for (let i = Math.min(p[1], c[1]); i <= Math.max(p[1], c[1]); i++) {
                    const [x, y] = [p[0], i] //translate([p[0], i], range);
                    //// console.log(y,x);
                    grid[y][x] = "#";
                }
            } else if (p[1] === c[1]) {
                for (let i = Math.min(p[0], c[0]); i <= Math.max(p[0], c[0]); i++) {
                    const [x,y] = [i, p[1]];
                    //// console.log(y,x);
                    grid[y][x] = "#";
                }
            } else {
                throw "invalid input, diagonal wall rendered.";
            }
            return c;
        })
    })

    return {grid, range};
}

export function addFloorToGrid(grid: grid) {
    grid.push(new Array(5000).fill("#"));
}

export function fillWithSand(grid: grid, range: xyRange, startPoint: xy) {
    let settled = true;
    const ts = startPoint // translate(startPoint, range);
    // console.log("start", ts)
    let i = 0;
    let lastPath: xy[] | undefined = undefined;
    while (settled) {
        const path:xy[] = []
        let last = ts;
        settled = false;
        for (let y = 0; y < grid.length; y++) {
            path.push(last);
            // // console.log(last);
            if (grid[y][last[0]] === ".") {
                // safe to keep moving
                // console.log("moving down");
                last = [last[0],y];
            // } else if (last[0] <= 0) {

            //     // console.log("off the left");
            //     break; // off the left
            } else if (grid[y][last[0] - 1] === ".") {
                // console.log("moving down and left");
                last = [last[0] - 1, y];
            // } else if (last[0] >= xRange(range) -1) {
            //     // console.log("off the right");
            //     break; // off the right
            } else if (grid[y][last[0] + 1] === ".") {
                // console.log("moving down and right");
                last = [last[0] + 1, y];
            } else {
                // console.log("settled");
                i++;
                settled = true;
                if (last[0] === ts[0] && last[1] === ts[1]) settled = false; // exit if hit start
                // // console.log(last[0], last[1])
                grid[last[1]][last[0]] = "o";
                break;
            }
        }
        if (!settled) lastPath = path;
        // console.log("step ", i);
        // drawGrid(grid, path);
    }

    return {
        sand: i,
        lastGrid: drawGrid(grid, lastPath)
    };
}

// export function translate(input: xy, range: xyRange, reverse = false): xy {
//     return reverse ?
//         [input[0] + range.min[0], input[1] + range.min[1]]:
//         [input[0] - range.min[0], input[1] - range.min[1]];
// }

export type xyRange = {
    min: xy;
    max: xy;
}

export function xRange(range: xyRange) {
    return range.max[0] - range.min[0] + 1;
}

export function yRange(range: xyRange) {
    return range.max[1] - range.min[1] + 1;
}

export function drawGrid(grid: grid, path?: xy[]) {
    const range = getGridRange(grid);
    console.log("range", range);

    if (path) {
        let s = "";
        for (let y = range.min[1]; y <= range.max[1]; y++) {
            for (let x = range.min[0]; x < range.max[0]; x++) {
                // s += grid[y][x] !== "." ?
                //     grid[y][x] :
                //     path.find(pos => pos[0] === x && pos[1] === y) ?
                //         "~" :
                //         ".";
                s += path.find(pos => pos[0] === x && pos[1] === y) ?
                    "~" : grid[y][x];
            }
            s += "\n"
        }
        console.log(s);
        return s;
    } else {
        const s = grid.map(row => row.join("")).join("\n");
        console.log(s);
        return s;
    }

}

function getGridRange(grid: grid): xyRange {
    const isFull = (item: squareState) => item !== ".";

    let minx: number | undefined = undefined;
    let miny: number | undefined = undefined;
    let maxx: number | undefined = undefined;
    let maxy: number | undefined = undefined;

    for (let y = 0; y < grid.length -1; y++) { // -1 to skip floor if present
        for (let x = 0; x < grid[y].length; x++) {
            if (isFull(grid[y][x])) {
                miny = typeof(miny) === "number" ? Math.min(miny, y) : y;
                minx = typeof(minx) === "number" ? Math.min(minx, x) : x;
                maxx = typeof(maxx) === "number" ? Math.max(maxx, x) : y;
                maxy = typeof(maxy) === "number" ? Math.max(maxy, y) : y;
            }
        }
    }

    return {
        min: [
            minx ?? 0,
            miny ?? 0
        ],
        max: [
            maxx ?? 0,
            maxy ?? 0
        ]
    }
}

export type xy = [number, number];

export type squareState = "#" | "." | "o";

export type grid = squareState[][] // y-x not x-y