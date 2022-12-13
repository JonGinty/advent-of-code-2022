import { indexRelative } from "../utils/workingFolder.ts";
import { Grid, traverseGrid } from "./gridtools.ts";


const input = await Deno.readTextFile(indexRelative("input.txt"));

// const path = traverseGrid(new Grid(input), "S", "E");
const grid = new Grid(input);
const cost = grid.rankSquares("E", "S");
//console.log("part 1:", path, path && path.length -1);
console.log("part 1:", cost);
console.log("part 2:", grid.lowestRankForInput("E", "a"));










export type MyType = {
    foo: string,
    bar: string;
    car: {dar: string}
}

export function getFromApi(someUrl: string): Promise<MyType> {
    return fetch(someUrl).then(async r => {
        const t = await r.json() as MyType | undefined; // t is nullable here
        if (t && t.car) return t; // t is not nullable here
        //return t as MyType;
        throw "returned object was null or missing property"
    })
}

export function processApiResult(fromApi: MyType) {
    console.log(fromApi.car.dar) // no need to validate, can't be null
}