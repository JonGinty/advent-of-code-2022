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

//const scorecache: Record<string, scoreResult> = {}; // it's bad that this is global but hey ho

export type scoreResult = { score: number, opened: string[] | undefined, leftOpened?: string[], rightOpened?: string[]};

export function valveScore(valve: string, valves: Record<string, valve>, path: pathStep[], stepCount: number, externallyOpened: string[] = [], scorecache: Record<string, scoreResult> = {}): scoreResult {
    //console.log(path.length);


    //console.log("checking", valve);
    //console.log("for path", path);
    if (path.length >= stepCount) return { score: 0, opened: undefined };
    const v = valves[valve];
    const openValves = [...new Set([...path.filter(p => p.from === p.to).map(p => p.from), ...externallyOpened]).values()];
    openValves.sort();
    const openValvesKey = openValves.length > 0 ? openValves.reduce((p,n) => p + n) : "closed";
    const scorecachekey = `${valve}_${stepCount}_${path.length}_${openValvesKey}`;
    //console.log("checking", scorecachekey);
    if (typeof(scorecache[scorecachekey]) === "object") {
        // console.log("from cache", scorecache[scorecachekey])
        return scorecache[scorecachekey];
    } 


    let score: scoreResult = {score: 0, opened: undefined};
    let newPath = [...path];

    const evaluateTunnels = (toSkip: string[]) => {
        return v.tunnels.map(nv => valveScore(nv, valves, [...newPath, {from: valve, to: nv}], stepCount, toSkip, scorecache)).reduce((p, c) => p.score > c.score ? p : c);
    }
    newPath = [...path];
    score = evaluateTunnels(externallyOpened);

    if (v.value !== 0) {
        const isOpen = externallyOpened.includes(v.key) || openValves.includes(v.key);
        if (!isOpen) {
            console.log("valve is not open", v.key, openValves);
            newPath.push({from: valve, to: valve});
            const modifier = (stepCount - newPath.length) * v.value;
            const newScore = evaluateTunnels(externallyOpened);
            if (newScore.score + modifier > score.score) {
                score = {score: newScore.score + modifier, opened: newScore.opened ? [...newScore.opened, valve] : [valve]}
            }
        }
    }

    //score += evaluateTunnels([...externallyOpened, ])
    const toSkip = [...externallyOpened];
    score?.opened?.forEach(s => !toSkip.includes(s) ? toSkip.push(s) : undefined );

    toSkip.push(...externallyOpened)
    const secondScore = evaluateTunnels(toSkip);
    
    const done = [...new Set([...toSkip, ...(secondScore.opened || [])]).values()];
    score = {
        score: score.score + secondScore.score,
        opened: done
    }

    if (typeof(scorecache[scorecachekey]) === "object" && scorecache[scorecachekey].score !== score.score) {
        console.log("found exception for score:", valve, score, scorecache[scorecachekey], scorecachekey);
    }

    console.log("score found", scorecachekey, score)
    scorecache[scorecachekey] = score;
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

