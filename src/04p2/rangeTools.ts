
export function checkOverlapForFullLineInput(fullInput: string): boolean {
    const [left, right] = fullInput.split(",");
    return checkOverlap(left, right);
}

export function checkOverlap(leftInput: string, rightInput: string): boolean {
    const lRange = getRangeFromInput(leftInput);
    const rRange = getRangeFromInput(rightInput);
    return rangeContains(lRange.min, rRange.min, rRange.max)
        || rangeContains(lRange.max, rRange.min, rRange.max)
        || rangeContains(rRange.min, lRange.min, lRange.max)
        || rangeContains(rRange.max, lRange.min, lRange.max)

}

export function rangeContains(value: number, min: number, max: number) {
    return value >= min && value <= max;
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