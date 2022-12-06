


export function findUniqueStringLocation(input: string, length = 4) {
    const buffer: string[] = [];
    for (let i = 0; i < input.length; i++) {
        buffer.push(input[i]);
        if (buffer.length > length) buffer.shift();
        if (buffer.length === length && !containsDupe(buffer)) return (i) + 1;
    }
    return -1;
}

export function containsDupe(input: string[]): boolean {
    return new Set(input).size < input.length;
}