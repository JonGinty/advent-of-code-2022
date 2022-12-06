import { splitByLine } from "../01/splitByLine.ts";


export function charVal(char: string) {
    if (char.length !== 1) throw "expected exactly one character, got " + char;
    const code = char.charCodeAt(0);
    if (code <= 90) {
        if (code < 65) throw `expected A-Z a-z, got ${char}`;
        return (code - 64) + 26;
    } else {
        if (code > 122) throw `expected A-Z a-z, got ${char}`;
        return code - 96;
    }
}


export function splitInHalf(input: string): {left: string, right: string} {
    return { 
        left: input.substring(0, input.length / 2),
        right: input.substring(input.length / 2, input.length)
    }
}

export function findCommonItems(left: string, right: string): string {
    let commonChars = "";
    for (const char of left) {
        if (commonChars.indexOf(char) === -1 && right.indexOf(char) !== -1) commonChars += char;
    }
    return commonChars;
}

export function findCommonItemsFromNonSplit(input: string): string {
    const {left, right} = splitInHalf(input);
    return findCommonItems(left, right);
}


export function valueOfCommonItems(left: string, right: string): number {
    const common = findCommonItems(left, right);
    let val = 0;
    for (const c of common) val += charVal(c);
    return val;
}

export function valueOfCommonItemsForFullInput(fullInput: string): number {
    let val = 0;
    splitByLine(fullInput).forEach(line => {
        const {left, right} = splitInHalf(line);
        val += valueOfCommonItems(left, right);
    });
    return val;
}


export function findCommonCharsBetweenLines(inputLines: string[]) {
    let common = "";
    const first = inputLines[0];
    
    for (const c of first) {
        if (common.indexOf(c) !== -1 || inputLines.find(str => str !== first && str.indexOf(c) === -1)) continue;
        common += c;
    }
    return common;
}