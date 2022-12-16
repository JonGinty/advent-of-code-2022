import { splitByLine } from "../01/splitByLine.ts";



export function readValvesFromInput(input: string): valve[] {
    return splitByLine(input).map(l => readValveFromInput(l));
}

const valveRegex = /[A-Z]{2}/g
const valveFlowRegex = /rate\=([0-9]+);/g

export function readValveFromInput(input: string): valve {
    const valves = [...input.matchAll(valveRegex)].map(m => m[0]);
    const tValve = valves.shift();
    const valvematch = [...input.matchAll(valveFlowRegex)][0];
    if (!valvematch) throw new Error(`unexpected input, unable to read valve flow rate from input: ${input}`); 
    const flow = parseInt(valvematch[1]);
    if (!tValve || isNaN(flow)) throw new Error(`unexpected input, got "${valvematch[1]}" and "${tValve}" from: ${input}`);
    return {
        key: tValve,
        tunnels: valves,
        value: flow
    }
}

export function buildRecordForValves(valves: valve[]): Record<string, valve> {
    const r: Record<string, valve> = {};
    valves.forEach(v => r[v.key] = v);
    return r;
}

const scorecache: Record<string, number> = {}; // it's bad that this is global but hey ho

export function valveScore(valve: string, valves: Record<string, valve>, path: pathStep[], stepCount: number): number {
    //console.log(path.length);


    //console.log("checking", valve);
    //console.log("for path", path);
    if (path.length >= stepCount) return 0;
    const v = valves[valve];
    const openValves = path.filter(p => p.from === p.to).map(p => p.from);
    openValves.sort();
    const openValvesKey = openValves.length > 0 ? openValves.reduce((p,n) => p + n) : "closed";
    const scorecachekey = `${valve}_${stepCount}_${path.length}_${openValvesKey}`;
    if (typeof(scorecache[scorecachekey]) === "number") {
        // console.log("from cache", scorecache[scorecachekey])
        return scorecache[scorecachekey];
    } 


    let score = 0;
    let newPath = [...path];

    // const lastIndex = path.findLastIndex(s => s.from === valve);
    // if (lastIndex > -1) {
    //     let found = false;
    //     for (let i = lastIndex + 1; i < path.length; i++) {
    //         if (path[i].from === path[i].to) {
    //             found = true;
    //             break;
    //         }
    //     }
        
    //     if (!found) {
    //         // console.log("in a loop");
    //         scorec
    //         return 0; // we're in a loop
    //     }
    // }

    const evaluateTunnels = () => {
        return v.tunnels.map(nv => valveScore(nv, valves, [...newPath, {from: valve, to: nv}], stepCount)).reduce((p, c) => Math.max(p,c))
    }
    newPath = [...path];
    score = evaluateTunnels();

    if (v.value !== 0) {
        const isOpen = openValves.includes(v.key);
        if (!isOpen) {

            newPath.push({from: valve, to: valve});
            const plusScore = (stepCount - newPath.length) * v.value;
            score = Math.max(evaluateTunnels() + plusScore, score);
        }
    }
    if (typeof(scorecache[scorecachekey]) === "number" && scorecache[scorecachekey] !== score) {
        console.log("found exception for score:", valve, score, scorecache[scorecachekey], scorecachekey);
    }

    // console.log("score found", score)
    console.log("score found", scorecachekey)
    scorecache[scorecachekey] = score;
    return score;
}


// export function rankValves(valves: valve[], rounds: number, startValve: string): Record<string, valvescore> {
//     // const scores: valvescore[] = valves.map(v => {
//     //     return {...v, path: [], score: 0}
//     // });
//     // const start = scores.find(v => v.key === startValve);
//     // if (!start) throw new Error("couldn't find valve with key " + startValve);
//     // start.path.push({valve: startValve, opened: false});
    
//     const scores = openLastValveInPaths(findShortestPathToEachValve(valves, startValve), rounds);
//     const toEvaluate: valvescore[] = [];
//     for (const key in scores) {toEvaluate.push(scores[key])}

//     while (toEvaluate.length) {
//         const valve = toEvaluate.shift();
//         if (!valve) break;
//         if (valve.path.length >= rounds) break;
//     }

//     return scores;
// }

// export function findShortestPathToEachValve(valves: valve[], startValve: string): Record<string, valvepath> {
//     const paths: Record<string, valvepath> = {};
//     valves.forEach(v => paths[v.key] = {...v, path: undefined})
//     const start = paths[startValve];
//     if (!start) throw new Error("couldn't find valve with key " + startValve);
//     start.path = [];

//     let changed = true;
//     while (changed) {
//         changed = false;
//         for (const key in paths) {
//             const v = paths[key];
//             if (!v.path) continue; // nothing to do here,
//             v.tunnels.forEach(t => {
//                 const tunnel = paths[t];
//                 if (!tunnel) throw new Error("valve not found: " + t);
//                 if (!tunnel.path || tunnel.path.length > v.path!.length + 1) {
//                     tunnel.path = [...v.path!, {from: key, to: tunnel.key}];
//                     changed = true;
//                 }
//             });
//         }
//     }
//     return paths;
// }

// export function openLastValveInPaths(valves: Record<string, valvepath>, rounds: number): Record<string, valvescore> {
//     const scores: Record<string, valvescore> = {};
//     for (const key in valves) {
//         const s = buildValveScore(valves[key]);
//         s.path.push({from: key, to: key});
//         s.score = Math.max(rounds - s.path.length, 0) * s.value;
//         scores[key] = s;
//     }
//     return scores;
// }


// export function buildValveScore(vp: valvepath): valvescore {
//     const copy = {...vp};
//     const path = vp.path ? [...vp.path] : [];
//     return {...copy, path, score: 0}
// }

export type valve = {
    key: string;
    tunnels: string[];
    value: number;
}

// export type valvepath = valve & {
//     path?: pathStep[]
// }



// export type valvescore = valve & {
//     path: pathStep[];
//     score: number;
// }

export type pathStep = {
    from: string;
    to: string;
}