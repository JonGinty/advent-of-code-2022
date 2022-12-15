
const delim = "_"

export class Grid<T> {
    private items: Record<string, T> = {};

    public getItems(includeEmpty?: boolean): gridSquare<T>[] {
        if (includeEmpty) throw new Error("Not implemented include empty functionality yet");
        const items: gridSquare<T>[] = []
        for (const key in this.items) {
            const c = Grid.getCoordsFromKey(key);
            items.push({
                x: c.x,
                y: c.y,
                item: this.items[key]
            });
        }
        return items;
    }

    public static buildKey(x: number, y: number) {
        return x + delim + y;
    }

    public static getCoordsFromKey(key: string): gridCoord {
        const [x,y] = key.split(delim).map(k => parseInt(k));
        return {x,y};
    }

    public getItem(x: number, y: number): T | undefined {
        return this.items[Grid.buildKey(x,y)];
    }

    public getItemC(c: gridCoord) {
        return this.getItem(c.x, c.y);
    }

    public setItem(x: number, y: number, item: T) {
        this.items[Grid.buildKey(x,y)] = item;
    }

    public setItemC(c: gridCoord, item: T) {
        this.setItem(c.x, c.y, item);
    }

    public getRange(): gridRange {
        const coords = Object.keys(this.items).map(k => Grid.getCoordsFromKey(k));
        const x = coords.map(c => c.x);
        const y = coords.map(c => c.y);
        return {
            minX: x.reduce((p,c) => Math.min(p,c)),
            minY: y.reduce((p,c) => Math.min(p,c)),
            maxX: x.reduce((p,c) => Math.max(p,c)),
            maxY: y.reduce((p,c) => Math.max(p,c)),
        }
    }

    public draw(opts?: drawOptions<T>): string {
        const lines = [];
        const range = opts?.customRange || this.getRange();
        let renderer = opts?.renderer
        if (!renderer) renderer = (item: T | undefined) => {
            if (typeof(item) === "undefined") return "."
            return `${item}`;
        } 

        
        for (let y = range.minY; y <= range.maxY; y++) {
            let s = ""
            for (let x = range.minX; x <= range.maxX; x++) {
                const key = Grid.buildKey(x, y);
                const item = this.items[key]; // todo: could check keys instead of value
                s += renderer(item);
            }
            lines.push(s);
        }
        
        const result = lines.join("\n")
        if (!opts?.noOutput) {
            console.log(result);
        }
        return result;
    }

    public static defaultValueExtractorForString(val: string) {
        if (!val || val === " ") return undefined;
        return val;
    }

    public static defaultValueExtractorForInt(val: string) {
        if (!val || val === " ") return undefined;
        const int = parseInt(val);
        if (isNaN(int)) return undefined;
        return int;
    }

    

    public parse(input: string, opts?: parseOptions<T>): void {
        const parser = opts?.valueExtractor || Grid.defaultValueExtractorForString as (s:string) => T | undefined;
        let x = 0, y = 0;
        for (let i = 0; i < input.length; i++) {
            const s = input.charAt(i);
            if (s === "\n") {
                y++
                x = 0;
            } else {
                const val = parser(input[i]);
                if (typeof(val) !== "undefined") {
                    this.setItem(x, y, val);
                }
                x++
            }
        }
    }
}

export type gridCoord = {
    x: number;
    y: number;
}

export function gridCoordB(x: number, y: number) {
    return {x,y}
}

export function isInBounds(range: gridRange, c: gridCoord): boolean {
    if (c.x < range.minX) return false;
    if (c.x > range.maxX) return false;
    if (c.y < range.minY) return false;
    if (c.y > range.maxY) return false;
    return true;
}

export type gridSquare<T> = gridCoord & {
    item: T
}

export type gridRange = {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}

export type drawOptions<T> = {
    renderer?: (item: T | undefined) => string;
    noOutput?: boolean;
    customRange?: gridRange;
}

export type parseOptions<T> = {
    valueExtractor?: (s:string) => T | undefined; // get value from single character
}