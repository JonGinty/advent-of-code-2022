


export function readGridFromInput(input: string): Grid {
    return new Grid(input);
}

export function traverseGrid(grid: Grid, startChar: string, targetChar: string): path | false {
    const path:path = [];
    path.push({...grid.findChar(startChar), char: startChar});
    const target = {...grid.findChar(targetChar), char: targetChar};
    return findMinPath(grid, path, [], target);
}

export function findMinPath(grid: Grid, currentPath: path, deadEnds: gridEntry[], target: gridEntry): path | false {
    //console.log(currentPath.map(c => c.char));
    console.log(currentPath.length);
    const current = currentPath.findLast(() => true)!;
    const nextMoves = grid
                        .getSurroundingChars(current)
                        // strip rows we've already done
                        .filter(move => !currentPath.find(old => move.row === old.row && move.col === old.col))
                        // .filter(move => !deadEnds.find(old => move.row === old.row && move.col === old.col))
                        .filter(move => validMove(current.char, move.char));
    const final = nextMoves.find(m => m.char === target.char);
    if (final) {
        console.log("path found! ", currentPath.length);
        return [...currentPath, final];
    } 
    
    nextMoves.sort((a, b) => order.indexOf(a.char) - order.indexOf( b.char));
    //if (nextMoves.length) console.log(nextMoves.map(m => m.char));
    const nextPaths = nextMoves.map(m => findMinPath(grid, [...currentPath, m], deadEnds, target)).filter(p => p);
    //console.log("next:", nextPaths);
    if (nextPaths.length === 0) {
        // deadEnds.push(current);
        return false; // no way to proceed;
    }
    return nextPaths.reduce((p, c) => c && p && c.length < p.length ? c : p);
}

export class Grid {
    rows: string[];

    constructor(input: string) {
        this.rows = input.split("\n");
    }

    getChar(position: position) {
        return this.rows[position.row][position.col];
    }

    findChar(char: string): position {
        for (let i = 0; i < this.rows.length; i++) {
            const index = this.rows[i].indexOf(char);
            if (index >= 0) return {
                row: i,
                col: index
            };
        }
        throw new Error("Couldn't find char in grid: " + char);
    }

    getSurroundingChars(position: position): gridEntry[] {
        const positions: position[] = [];
        if (position.col < this.rows[position.row].length - 1) positions.push({row: position.row, col: position.col + 1}); //right
        if (position.row < this.rows.length - 1) positions.push({row: position.row + 1, col: position.col}); // down
        if (position.row > 0) positions.push({row: position.row - 1, col: position.col}); // up
        if (position.col > 0) positions.push({row: position.row, col: position.col - 1}); // left
        return positions.map(p => {return {...p, char: this.getChar(p)}});
    }
}

export const order = "SabcdefghijklmnopqrstuvwxyzE";

export function validMove(current: string, next: string) {
    const ci = order.indexOf(current);
    const ni = order.indexOf(next);
    if (ci === -1) throw Error("invalid move, not a valid character: "+current);
    if (ni === -1) throw Error("invalid move, not a valid character: "+next);
    return ni < ci + 2;
}

export type position = {
    row: number;
    col: number;
}

export function p(row: number, col: number):position {
    return {row, col}
}

export type gridEntry = position & {
    char: string;
}

export type path = gridEntry[];