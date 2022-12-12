import { parse } from "https://deno.land/std@0.166.0/path/win32.ts";
import { splitByLine } from "../01/splitByLine.ts";

export function getCommandsFromInput(input: string): commandInstance[] {
    return splitByLine(input).map(line => getCommandFromInput(line));
}

export function getCommandFromInput(input: string): commandInstance {
    const all = input.split(" ");
    if (!(all[0] in allCommands)) throw `unknown command "${all[0]}"`;
    return {command: all[0] as com, arg: all[1]}
}

export function runComands(commands: commandInstance[]): cycle[] {
    const cycles: cycle[] = [];
    let lastCycle: cycle = {command: "start", X: 1}
    cycles.push(lastCycle);
    for (const command of commands) {
        runCommand(command.command, command.arg, lastCycle).forEach(c => {
            lastCycle = c;
            cycles.push(c);
        });
    }
    return cycles;
}

export function runCommand(command: com, arg: string, lastCycle: cycle): cycle[] {
    return allCommands[command](arg, lastCycle);
}

export function getSumOfCycleValues(steps: number[], cycles: cycle[]): number {
    let sum = 0;

    steps.forEach(s => {
        const cycle = cycles[s-1];
        // console.log({s, X: cycle.X});
        sum += (cycle.X * s);
    })
    
    return sum;
}

export type cycle = {
    command: com | "start";
    X: number;
    arg?: string;
    commandStep?: number;
}



export type com = keyof(commands);

class commands {
    addx: commandFunc = (arg: string, lastCycle: cycle) => {
        const argNum = parseFloat(arg);
        if (isNaN(argNum)) throw new Error("expected number, got " + arg);
        return [{X: lastCycle.X, command: "addx", arg, commandStep: 0}, {X: lastCycle.X + argNum, command: "addx", arg, commandStep: 1}]
    }
    noop: commandFunc = (arg: string, lastCycle: cycle) => {
        return [{...lastCycle, command: "noop"}];
    }
}

export const allCommands = new commands();
export type commandInstance = {
    command: com;
    arg: string;
}

export type commandFunc = (arg: string, lastCycle: cycle) => cycle[];