import { command, xy, dc, xyDiff } from "./inputTools.ts";




export function move(command: command, state: state): state {
    for (let i = 0; i < command.distance; i++) {
        const knots = [...state.knots];
        knots[0] = dc[command.direction](knots[0]);
        state = state = { ...state, knots }

        for (let j = 0; j < knots.length - 1; j++) {
            const h = knots[j];
            const t = knots[j+1];

            const diff = xyDiff(t, h);
            if (diff[1] === 0) { // check if same row
                if (diff[0] > 1) {
                    knots[j+1] = dc.L(t);
                } else if (diff[0] < -1) {
                    knots[j+1] = dc.R(t);
                } else {
                    // no need to move
                }
            } else if (diff[0] === 0) { // check if same col
                if (diff[1] > 1) {
                    knots[j+1] = dc.D(t);
                } else if (diff[1] < -1) {
                    knots[j+1] = dc.U(t);
                } else {
                    // no need to move
                }
            } else if (Math.abs(diff[0]) <= 1 && Math.abs(diff[1]) <= 1) { 
                // no need to move
            } else {
                if (diff[0] > 0) {
                    knots[j+1] = dc.L(t);
                } else {
                    knots[j+1] = dc.R(t);
                } 

                if (diff[1] > 0) {
                    knots[j+1] = dc.D(knots[j+1]); // can't use t because it will have been changed
                } else {
                    knots[j+1] = dc.U(knots[j+1]);
                } 
            }
        }
        state = {...state, knots};
        state.tVisited.add(`${knots[knots.length - 1][0]},${knots[knots.length - 1][1]}`);
    }
    return state;
}

export function countVisited(tVisited: Set<string>) {
    return tVisited.size;
}

export function printKnots(knots: xy[]) {
    let minX = 0, maxX = 0, minY = 0, maxY = 0;
    knots.forEach(k => {
        minX = Math.min(minX, k[0]);
        maxX = Math.max(maxX, k[0]);
        minY = Math.min(minY, k[1]);
        maxY = Math.max(maxY, k[1]);
    });

    let outstring = "";
    for (let y = maxY; y >= minY; y--) {
        for (let x = minX; x <= maxX; x++) {
            const kn = knots.find(k => k[0] === x && k[1] === y);
            if (kn) {
                outstring += "" + knots.indexOf(kn);
            } else {
                outstring += "-"
            }
        }
        outstring += "\n";
    }
    console.log(outstring);
}


export function prettyPrint(tVisited: number[][]) {
    let maxY = 0;
    tVisited.forEach(c => maxY = Math.max(maxY, c.length));
    let outstring = "";

    for (let y = maxY - 1; y >= 0; y--) {
        for (let x = 0; x < tVisited.length; x++) {
            if (tVisited[x]) {
                outstring += tVisited[x][y] ? "#" : "-";
            }
        }
        outstring += "\n";
    }
    console.log(outstring);
}

export function prettyPrintSet(tVisited: Set<string>) {
    const arr: number[][] = [];
    let count = 0;
    tVisited.forEach(s => {
        const [x, y] = s.split(",").map(v => parseInt(v));
        if (!arr[x]) arr[x] = [];
        arr[x][y] = count++;
        console.log(s);
    })
    console.log(arr);
    prettyPrint(arr);
}


export type state = {
    tVisited: Set<string>;
    knots: xy[];
}