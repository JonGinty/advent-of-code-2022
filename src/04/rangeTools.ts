
export function checkOverlapForFullLineInput(fullInput: string): boolean {
    const [left, right] = fullInput.split(",");
    return checkOverlap(left, right);
}

export function checkOverlap(leftInput: string, rightInput: string): boolean {
    const lRange = getRangeFromInput(leftInput);
    const rRange = getRangeFromInput(rightInput);
    if (lRange.min > rRange.min) {
        return lRange.max <= rRange.max
    } else if (lRange.min < rRange.min) {
        return lRange.max >= rRange.max;
    } else {
        return true; // if they both have the same min or max then they definitely overlap
    }
}

export function getRangeFromInput(input: string): {min: number, max: number} {
    const [min, max] = input.split("-").map(i => parseInt(i));
    if (isNaN(max) || isNaN(min)) throw `input should be in the format "3-7" where 3 and 7 are any number, got "${input}"`;
    return {min, max}
}

export function expandRange(min: number, max: number): number[] {
    const result: number[] = [];
    for (let i = min; i <= max; i++) {
        result.push(i);
    }
    return result;
}