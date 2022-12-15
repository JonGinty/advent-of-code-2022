import { splitByLine } from "../01/splitByLine.ts";
import { Grid, gridCoord, gridCoordB, gridRange, gridSquare, isInBounds, renderFunc } from "../utils/grid.ts";

const coordRegex = /x\=(?<x>\-?[0-9]+)\, y\=(?<y>\-?[0-9]+)/g

export function readGridFromInput(input: string): Grid<square> {
    const lines = splitByLine(input);
    const grid = new Grid<square>();
    lines.forEach(l => {
        const coords = getCoordsFromLine(l);
        grid.setItemC(coords[0], "S");
        grid.setItemC(coords[1], "B")
    });
    return grid;
}

export function getCoordsFromLine(line: string): gridCoord[] {
    return [...line.matchAll(coordRegex)].map(c => gridCoordB(parseInt(c[1]), parseInt(c[2])))
}

export function readRangesFromInput(input: string): bDistance[] {
    return splitByLine(input).map(l => {
        const [sCoords, bCoords] = getCoordsFromLine(l);

        return {sCoords, d: Grid.manhattanDistance(sCoords, bCoords)}
    });
}

export function showScannedSquares(grid: Grid<square>, boundsCheck = true) {
    let b = 0;
    grid.getItems().forEach(item => {
        //if (b++ > 5) return;
        if (item.item === "S")showScannedSquaresForItem(grid, item, boundsCheck);
    });
}

export function showScannedSquaresForItem(grid: Grid<square>, item: gridSquare<square>, boundsCheck = true) {
    let foundB = false;
    let coords: gridCoord[] = [item]
    const range = grid.getRange();
    while (!foundB) {
        const nextCoords: gridCoord[] = [];
        coords.forEach(c => {
            const i = grid.getItemC(c);
            if (i === "B") foundB = true;
            else if (!boundsCheck || isInBounds(range, c)) {    
                if (!i) grid.setItemC(c, "#");
                if (c.x <= item.x) nextCoords.push({x: c.x - 1, y: c.y});
                if (c.x >= item.x) nextCoords.push({x: c.x + 1, y: c.y});
                if (c.y <= item.y) nextCoords.push({x: c.x, y: c.y - 1});
                if (c.y >= item.y) nextCoords.push({x: c.x, y: c.y + 1});
            }
        });
        coords = nextCoords;
    }
}

export function determineFullRange(distances: bDistance[]): gridRange {
    const r = {
        minX:0,
        maxX:0,
        minY:0,
        maxY:0
    } // todo: this does assume we cross origin
    distances.forEach(d => {
        r.minX = Math.min(r.minX, d.sCoords.x - d.d);
        r.minY = Math.min(r.minY, d.sCoords.y - d.d);
        r.maxX = Math.max(r.maxX, d.sCoords.x + d.d);
        r.maxY = Math.max(r.maxY, d.sCoords.y + d.d);
    });

    return r;
}

export function countEmptySquares(grid: Grid<square>, range: gridRange, distances: bDistance[]) {
    let count = 0;
    for (let x = range.minX; x <= range.maxX; x++) {
        for (let y = range.minY; y <= range.maxY; y++) {
            if (grid.getItem(x,y)) continue;
            if (distances.find(d => {
                const md = Grid.manhattanDistance(gridCoordB(x,y), d.sCoords);
                return md <= d.d; // this sensor should have hit this square
            })) count++;
        }
    }
    return count;
}


export function buildSingleRowRenderer(distances: bDistance[]): renderFunc<square> {
    return (val: square | undefined, _grid?: Grid<square>, coords?: gridCoord) => {
        if (val) return "" + val;
        if (distances.find(d => {
            const md = Grid.manhattanDistance(coords!, d.sCoords);
            return md <= d.d; // this sensor should have hit this square
        })) return "#";
        return ".";
    }
}

export function getAllOffBy1Squares(distances: bDistance[], range: gridRange) {
    // console.log("range", range)
    const addIfInRange = (c: gridCoord, cells: gridCoord[]) => {
        
        // console.log("checking", c.x, c.y)
        if (c.x >= range.minX && c.x <= range.maxX && c.y >= range.minY && c.y <= range.maxY) 
            cells.push(c);
        else {
            // console.log("out of range", c.x, c.y)
        }
    }

    let dCount = 0;
    

    for (const d of distances) {
        dCount++;
        let cCount = 0;
        for (let i = 0; i <= d.d + 1; i++) {
            const cells: gridCoord[] = [];
            const a = i, b = d.d + 1 - i;
            addIfInRange(gridCoordB(d.sCoords.x - a, d.sCoords.y - b), cells); // up left
            addIfInRange(gridCoordB(d.sCoords.x + a, d.sCoords.y - b), cells); // up right
            addIfInRange(gridCoordB(d.sCoords.x - a, d.sCoords.y + b), cells); // down left
            addIfInRange(gridCoordB(d.sCoords.x + a, d.sCoords.y + b), cells); // down right
            

            for (const cell of cells) {
                let found = true;
                if (Grid.manhattanDistance(cell, d.sCoords) - d.d !== 1) throw new Error("out of range")

                for (const d2 of distances) {
                    if (d === d2) continue;
                    const md = Grid.manhattanDistance(cell, d2.sCoords);
                    if (md <= d2.d) {
                        found = false;
                        // console.log("not valid", md, d.d);
                        break;
                    }
                    // console.log("valid", md, d.d)
                }
                if (found) return cell;
            }

            //if (cCount++ %10 === 0) console.log("checked", dCount, cCount);
        }
    }
}

export type bDistance = { sCoords: gridCoord, d: number }

export type square = "S" | "B" | "#";