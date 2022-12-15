import { splitByLine } from "../01/splitByLine.ts";
import { Grid, gridCoord, gridCoordB, gridSquare, isInBounds } from "../utils/grid.ts";

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

export type square = "S" | "B" | "#";