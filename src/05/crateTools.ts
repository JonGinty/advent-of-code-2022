
const charsBetweenStack = "] [";
const charsBeforeFirstStack = "["
const startIndex = charsBeforeFirstStack.length;
const interval = charsBetweenStack.length + 1;

export function readStacks(inputLines: string[]): stacks {
    let exit = false;
    
    const stacks: stacks = [];
    for (const line of inputLines) {
        if (exit) break;
        for (let i = startIndex; i < line.length; i+=interval) {
            const item = line[i];
            if (!item || item === " ") continue;
            if (!isNaN(parseInt(item))) {
                exit = true;
                break;
            }
            const stackNumber = Math.floor(i / interval);
            if (!stacks[stackNumber]) stacks[stackNumber] = [];
            stacks[stackNumber].unshift(item);
        }
    }
    return stacks;
}

export function readMoves(inputLines: string[]): move[] {
    const moves: move[] = [];
    for (const line of inputLines) {
        if (!line.startsWith("move")) continue;
        const [move, from, to] = line.split(" ").map(v => parseInt(v)).filter(v => !isNaN(v));
        moves.push({move, from, to})
    }
    return moves;
}

export function applyMovesToStacks(stacks: stacks, moves: move[]) {
    moves.forEach(move => applyMoveToStacks(stacks, move));
}

export function applyMoveToStacks(stacks: stacks, move: move) {
    for (let i = 0; i < move.move; i++) {
        const item = stacks[move.from -1].pop();
        if (!item) throw `attempted to remove an item from stack ${move.from} which was empty`;
        stacks[move.to -1].push(item);
    }
}

// note that this will malform the stacks
export function readTopItems(stacks: stacks): string {
    return stacks.map(stack => stack.pop()).join("");
}

export type move = {
    move: number;
    from: number;
    to: number;
}

export type stacks = string[][];
