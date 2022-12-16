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

export function valveScore(current: [string, string], valves: Record<string, valve>, path: pathStep[], stepCount: number): number {
    //console.log(path.length);

    //console.log("checking", valve);
    //console.log("for path", path);
    if (path.length >= stepCount *) return 0;
    current.sort();
    const openValves = path.filter(p => p.from === p.to).map(p => p.from);
    openValves.sort();
    const openValvesKey = openValves.length > 0 ? openValves.reduce((p,n) => p + n) : "closed";
    const scorecachekey = `${current.join(",")}_${stepCount}_${path.length}_${openValvesKey}`;
    if (typeof(scorecache[scorecachekey]) === "number") {
        // console.log("from cache", scorecache[scorecachekey])
        return scorecache[scorecachekey];
    } 


    let score = 0;
    let newPath = [...path];


    const evaluateTunnels = (modifier = 0) => {
        valves[current[0]].tunnels.forEach(l => {
            valves[current[1]].tunnels.forEach(r => {
                score = Math.max(score, valveScore([l,r], valves, [...newPath, {from: current[0], to: l}, {from: current[1], to: r}], stepCount) + modifier);
            });
        });

        //return v.tunnels.map(nv => valveScore(nv, valves, [...newPath, {from: valve, to: nv}], stepCount)).reduce((p, c) => Math.max(p,c))
    }
    newPath = [...path];
    evaluateTunnels();
    if (current.find(vi => valves[vi].value > 0)) {
        const [l, r] = current.map(vi => valves[vi]);
        const preOpen = [...newPath];
        let added = 0;
        if (l.value > 0 && !openValves.includes(l.key)) {
            newPath.push({from: l.key, to: l.key});
            const plusScore = (stepCount - newPath.length) * l.value;
            evaluateTunnels(plusScore);
            added++
        } 
        if (l !== r && r.value > 0 && !openValves.includes(r.key)) {
            newPath = preOpen;
            newPath.push({from: r.key, to: r.key});
            const plusScore = (stepCount - newPath.length) * r.value;
            evaluateTunnels(plusScore);
            added++
        }
        if (added == 2) {
            newPath = preOpen;
            newPath.push({from: l.key, to: l.key});
            newPath.push({from: r.key, to: r.key});
            const plusScore = (stepCount - newPath.length) * r.value + (stepCount - newPath.length) * l.value;
            evaluateTunnels(plusScore);
        }
    }

    // if (v.value !== 0) {
    //     const isOpen = openValves.includes(v.key);
    //     if (!isOpen) {

    //         newPath.push({from: valve, to: valve});
    //         const plusScore = (stepCount - newPath.length) * v.value;
    //         score = Math.max(evaluateTunnels() + plusScore, score);
    //     }
    // }
    if (typeof(scorecache[scorecachekey]) === "number" && scorecache[scorecachekey] !== score) {
        console.log("found exception for score:", current.join(","), score, scorecache[scorecachekey], scorecachekey);
    }

    // console.log("score found", score)
    scorecache[scorecachekey] = score;
    console.log(`score found for ${scorecachekey}   -   ${score}`)
    return score;
}


export type valve = {
    key: string;
    tunnels: string[];
    value: number;
}

export type pathStep = {
    from: string;
    to: string;
}