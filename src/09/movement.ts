import { command, xy, dc, xyDiff } from "./inputTools.ts";




export function move(command: command, state: state): state {
    // console.log(command);
    // console.log("before", {h: state.h, t: state.t})
    for (let i = 0; i < command.distance; i++) {
        state = { ...state, h: dc[command.direction](state.h) }
        // console.log("Bt", {h: state.h, t: state.t})

        let moved = false;
        const diff = xyDiff(state.t, state.h);
        if (diff[0] > 1) {
            state = { ...state, t: dc.L(state.t) }
            moved = true;
        } else if (diff[0] < -1) {
            state = { ...state, t: dc.R(state.t) }
            moved = true;
        }

        if (diff[1] > 1) {
            state = { ...state, t: dc.D(state.t) }
            moved = true;
        } else if (diff[1] < -1) {
            state = { ...state, t: dc.U(state.t) }
            moved = true;
        }

        //if we're out on both axis, we need to align on one
        if (moved) {
            // console.log("moved, checking alignment");
            const newDiff = xyDiff(state.t, state.h, true);
            // console.log("newdiff", newDiff)
            if (newDiff[0] > 0 && newDiff[1] > 0) {
                // console.log("realigning");
                if (command.direction === "U" || command.direction === "D") {
                    state = state = { ...state, t: [state.h[0], state.t[1]] } // align x
                } else {
                    state = state = { ...state, t: [state.t[0], state.h[1]] } // align y
                }
            }
        }

        state.tVisited.add(`${state.t[0]},${state.t[1]}`);
        // if (!state.tVisited[state.t[0]]) state.tVisited[state.t[0]] = [];
        // if (!state.tVisited[state.t[0]][state.t[1]]) state.tVisited[state.t[0]][state.t[1]] = 0;
        // state.tVisited[state.t[0]][state.t[1]]++;
        // console.log("at", {h: state.h, t: state.t})
    }
    // console.log("after", {h: state.h, t: state.t})
    // console.log("")
    return state;
}

export function countVisited(tVisited: Set<string>) {
    return tVisited.size;
}


// export function prettyPrint(tVisited: number[][]) {
//     let maxY = 0;
//     tVisited.forEach(c => maxY = Math.max(maxY, c.length));
//     let outstring = "";

//     for (let y = maxY - 1; y >= 0; y--) {
//         for (let x = 0; x < tVisited.length; x++) {
//             outstring += tVisited[x][y] ? "#" : "-";
//         }
//         outstring += "\n";
//     }
//     console.log(outstring);
// }


export type state = {
    tVisited: Set<string>;
    t: xy;
    h: xy;
}