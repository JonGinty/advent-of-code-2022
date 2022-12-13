export class Grid {
    rows: string[];
    ranks: number[][];

    ranked = false; // I regred using OOP

    constructor(input: string) {
        this.rows = input.split("\n");
        const rowLength = this.rows[0].length;
        const totalCellCount = this.rows.length * rowLength;
        const arr = new Array(rowLength).fill(totalCellCount);
        this.ranks = [];
        for (let i = 0; i < this.rows.length; i++) this.ranks.push([...arr]);
        ///this.ranks = new Array(this.rows.length).fill([...arr]);
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

    evaluateRound(): boolean {
        let changed = false;
        for (let r = 0; r < this.rows.length; r++) {
            for (let c = 0; c < this.rows[0].length; c++) {
                const adjacent = this.getSurroundingChars(p(r, c));
                adjacent.forEach(item => {
                    const thisrank = this.ranks[r][c];
                    const thisItem = this.rows[r][c];
                    const otherItem = this.rows[item.row][item.col]
                    // console.log(thisItem, otherItem);
                    if (validMove(thisItem, otherItem)) {
                        // console.log("valid");
                        const otherank = this.ranks[item.row][item.col] + 1; // need to add one to get here
                        // console.log(thisrank, otherank);
                        if (otherank < thisrank) {
                            this.ranks[r][c] = otherank;
                            changed = true;
                        }
                    }
                });
            }
        }
        return changed;
    }

    rankSquares(end: string, start: string) {
        const endS = this.findChar(end);
        this.ranks[endS.row][endS.col] = 0;
        // console.log(this.rows);
        // console.log(this.ranks);
        if (!this.ranked) {
            while (this.evaluateRound()) {
                // console.log("still running");
            }
            this.ranked = true;
        }

        const startS = this.findChar(start);
        // console.log(this.ranks);
        return this.ranks[startS.row][startS.col];
    }

    lowestRankForInput(end: string, input: string) {
        let min = this.rankSquares(end, input);
        for (let r = 0; r < this.rows.length; r++) {
            for (let c = 0; c < this.rows[0].length; c++) {
                if (this.rows[r][c] === input) {
                    min = Math.min(min, this.ranks[r][c]);
                }
            }
        }
        return min;
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