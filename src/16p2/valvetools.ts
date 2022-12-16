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



export function valveScore(left: string, right: string, valves: Record<string, valve>, path: pathStep[], openValves: string, stepCount: number, currentStep: number = 0): number {
    ////console.log(stepCount);

    ////console.log("checking", left, right);
    //////console.log("for path", path);
    if (currentStep >= stepCount) return 0;
    const current = [left, right];
    //const openValves =  [...new Set<string>(path.filter(p => p.from === p.to).map(p => p.from)).values()];
    //openValves.sort();
    const openValvesKey = openValves.length > 0 ? openValves : "closed";
    const scorecachekey = `${current.join(",")}_${stepCount}_${currentStep}_${openValvesKey}`;

    ////console.log("checking", scorecachekey);
    //if (openValves.find((v: string, index: number) => openValves.indexOf(v) !== index)) throw "dupe found";
    if (typeof(scorecache[scorecachekey]) === "number") {
        ////console.log("from cache", scorecache[scorecachekey])
        return scorecache[scorecachekey];
    } 

    let score = 0;

    const leftToCheck = valves[left].tunnels;
    const rightToCheck = valves[right].tunnels;
    if (valves[left].value > 0 && !openValves.includes(left + ",")) {
        //console.log("opening left", left);
        leftToCheck.push(left);
    }
    if (left !== right && valves[right].value > 0 && !openValves.includes(right + ","))  
    {
        //console.log("opening right", right);
        rightToCheck.push(right);
    }

    ////console.log("tocheck", leftToCheck, rightToCheck)

    leftToCheck.forEach(l => {
        rightToCheck.forEach(r => {
            // let opened = false;
            let ov = openValves.length ? openValves.split(",") : [];
            let modifier = 0;
            if (l === left) {
                modifier += valves[left].value * (stepCount - currentStep);

                const ovset = new Set(ov);
                ovset.add(left);
                ov = [...ovset.values()];
                ov.sort();
                // opened = true;
            }
            if (r === right) {
                modifier += valves[right].value * (stepCount - currentStep);
                const ovset = new Set(ov);
                ovset.add(right);
                ov = [...ovset.values()];
                ov.sort();
                // opened = true;
            }
            const ovstring = modifier > 0 ? ov.join(",") : openValves;
            // modifier = l === left ? valves[left].value * (stepCount - currentStep) : 0;
            // modifier += r === right ? valves[right].value * (stepCount - currentStep) : 0; 
            score = Math.max( valveScore(l, r, valves, [...path, {from: left, to: l}, {from: right, to: r}], ovstring, stepCount, currentStep + 1) + modifier, score);
        });
    });

    // ////console.log("score found", score)
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