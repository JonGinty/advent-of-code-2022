import { splitByLine } from "../01/splitByLine.ts";

export type Monkey = {
    id: number;
    items: bigint[];
    operation: (old: bigint) => bigint;
    testDivisor: bigint;
    test: (value: bigint) => boolean;
    ifTrue: number;
    ifFalse: number;
    itemsInspected: number;
}

export function findMaxDivisor(monkeys: Monkey[]): bigint {
    let md = BigInt(1);
    monkeys.forEach(m => md *= m.testDivisor);
    return md;
}

export function readMonkeyFromInput(input: string): Monkey {
    const lines = splitByLine(input);
    const id = parseInt(lines[0].split(" ")[1]);
    if (isNaN(id)) throw new Error("expected monkey number to be a number, got " + lines[0]);
    const items = lines[1].trimStart()
                    .split(" ")
                    .map(s => s.replace(",", ""))
                    .map(s => {
                        try {
                            return BigInt(s)
                        } catch {
                            return false;
                        }
                    })
                    .filter(n => n !== false) as bigint[];
    const operationString = lines[2].substring(19);
    //console.log(operationString);
    //const operation = (old: bigint) => eval(operationString) as bigint;
    const operationSteps = operationString.split(" ");
    const operationOperator = operationSteps[1] as operator;
    const operationModifier = operationSteps[2] === "old" ? "old" : BigInt(operationSteps[2]);
    const operation = (old: bigint) => {
        
        const mod = operationModifier === "old" ? old : operationModifier;
        const answer = operationOperator === "+" ? old + mod : old * mod;
        // console.log(`${operationOperator}`)
        return answer;
    }

    const testString = lines[3].trimStart()
                        .split(" ")
                        .findLast(() => true);
    const testDivisor = (BigInt(testString ?? "1"));
    const test = (value: bigint) => value % testDivisor === BigInt(0);
    const ifTrue = parseInt(lines[4].charAt(lines[4].length - 1));
    const ifFalse = parseInt(lines[5].charAt(lines[5].length - 1));
    return {
        id,
        items,
        operation,
        test,
        testDivisor,
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

export function evaluateTurn(monkey: Monkey, allMonkeys: Monkey[], maxDivisor: bigint) {
    const items = [...monkey.items]
    monkey.items = [];
    items.forEach(item => {
        monkey.itemsInspected++;
        let newLevel = monkey.operation(item);
        //newLevel = Math.floor(newLevel / 3);
        newLevel = newLevel % maxDivisor;
        if (monkey.test(newLevel)) {
            allMonkeys[monkey.ifTrue].items.push(newLevel);
        } else {
            allMonkeys[monkey.ifFalse].items.push(newLevel);
        }
    })
}

export function evaluateRound(monkeys: Monkey[], maxDivisor: bigint) {
    monkeys.forEach(monkey => evaluateTurn(monkey, monkeys, maxDivisor));
}

export function evaluateRounds(monkeys: Monkey[], rounds: number) {
    const maxDivisor = findMaxDivisor(monkeys);
    //console.log("max divisor:", maxDivisor)
    for (let i = 0; i < rounds; i++) {
        console.log("\n\nround ", i);
        evaluateRound(monkeys, maxDivisor);
        // printMonkeys(monkeys);
    }
}

export function printMonkeys(monkeys: Monkey[]) {
    monkeys.forEach(m => printMonkey(m));
}

export function printMonkey(monkey: Monkey) {
    console.log(`Monkey ${0}: `, monkey.items);
}

type operator = "+" | "*";