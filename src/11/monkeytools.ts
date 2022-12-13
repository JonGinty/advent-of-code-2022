import { splitByLine } from "../01/splitByLine.ts";

export type Monkey = {
    id: number;
    items: number[];
    operation: (old: number) => number;
    test: (value: number) => boolean;
    ifTrue: number;
    ifFalse: number;
    itemsInspected: number;
}

export function readMonkeyFromInput(input: string): Monkey {
    const lines = splitByLine(input);
    const id = parseInt(lines[0].split(" ")[1]);
    if (isNaN(id)) throw new Error("expected monkey number to be a number, got " + lines[0]);
    const items = lines[1].trimStart()
                    .split(" ")
                    .map(s => s.replace(",", ""))
                    .map(s => parseInt(s))
                    .filter(n => !isNaN(n));
    const operationString = lines[2].substring(19);
    const operation = (old: number) => eval(operationString) as number;
    const testString = lines[3].trimStart()
                        .split(" ")
                        .findLast(() => true);
    const test = (value: number) => value % parseInt(testString ?? "1") === 0;
    const ifTrue = parseInt(lines[4].charAt(lines[4].length - 1));
    const ifFalse = parseInt(lines[5].charAt(lines[5].length - 1));
    return {
        id,
        items,
        operation,
        test,
        ifTrue,
        ifFalse,
        itemsInspected: 0
    }
}

export function readMonkeyArrayFromInput(input: string): Monkey[] {
    const monkeyInputs = input.split("\n\n");
    const monkeys: Monkey[] = [];
    for (const input of monkeyInputs) {
        const monkey = readMonkeyFromInput(input);
        monkeys[monkey.id] = monkey;
    }
    return monkeys
}

export function evaluateTurn(monkey: Monkey, allMonkeys: Monkey[]) {
    const items = [...monkey.items]
    monkey.items = [];
    items.forEach(item => {
        monkey.itemsInspected++;
        let newLevel = monkey.operation(item);
        newLevel = Math.floor(newLevel / 3);
        if (monkey.test(newLevel)) {
            allMonkeys[monkey.ifTrue].items.push(newLevel);
        } else {
            allMonkeys[monkey.ifFalse].items.push(newLevel);
        }
    })
}

export function evaluateRound(monkeys: Monkey[]) {
    monkeys.forEach(monkey => evaluateTurn(monkey, monkeys));
}

export function evaluateRounds(monkeys: Monkey[], rounds: number) {
    for (let i = 0; i < rounds; i++) {
        evaluateRound(monkeys);
        // console.log("\n\nround ", i);
        // printMonkeys(monkeys);
    }
}

export function printMonkeys(monkeys: Monkey[]) {
    monkeys.forEach(m => printMonkey(m));
}

export function printMonkey(monkey: Monkey) {
    console.log(`Monkey ${0}: `, monkey.items);
}