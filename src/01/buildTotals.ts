

export function buildTotals(raw: string[]): number[] {
    const output: number[] = [];
    let currentIndex = 0;
    output[0] = 0;
    raw.forEach(value => {
        const nval = parseFloat(value);
        if (isNaN(nval)) {
            currentIndex++;
            output[currentIndex] = 0;
        } else {
            output[currentIndex] += nval;
        }
    });
    return output;
}