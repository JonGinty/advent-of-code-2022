export function readPair(input: string) {
    const [left, right] = input.split("\n").map(s => JSON.parse(s));
    // console.log(left);
    // console.log(right)
    return {left, right};
}


export function c(left: item, right: item): boolean | null {
    if (typeof (left) === "number" && typeof (right) === "number") {
        if (left < right) return true;
        if (left > right) return false;
        return null;
    } else if (typeof (left) === "object" && typeof (right) === "object") {
        let i = -1;
        while (++i > -1) {
            if (typeof (left[i]) === "undefined") {
                if (typeof (right[i]) === "undefined") {
                    console.log("both out of items");
                    return null; 
                }
                console.log("left out of items");
                return true;
            } else if (typeof(right[i]) === "undefined") {
                console.log("right out of items");
                return false;
            }
            //
            console.log("both have items, comparing");
            const r = compare(left[i], right[i]);
            if (r !== null) return r;
        }
    } else if (typeof (left) === "number" && typeof (right) === "object") {
        return compare([left], right);
    } else if (typeof (right) === "number" && typeof (left) === "object") {
        return compare(left, [right]);
    } 
    throw new Error( "shouldn't be possible");
}

export function compare(left: item, right: item): boolean | null {
    console.log("comparing left", left);
    console.log("comparing right", right);
    const r = c(left, right);
    console.log("result", r);
    return r;
}


export type item = number | (item | number)[]