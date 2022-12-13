import { indexRelative } from "../utils/workingFolder.ts";
import { Grid, traverseGrid } from "./gridtools.ts";


const input = await Deno.readTextFile(indexRelative("input.txt"));

const path = traverseGrid(new Grid(input), "S", "E");

console.log("part 1:", path, path && path.length -1);
console.log("part 2:", 2);










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