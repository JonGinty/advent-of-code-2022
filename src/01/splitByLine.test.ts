import { splitByLine } from "./splitByLine.ts";
import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

const testString = `one
two

three
four`


Deno.test("split by line", () => {
    const split = splitByLine(testString);
    assertEquals(split.length, 5);
    assertEquals(split[0], "one");
    assertEquals(split[1], "two");
    assertEquals(split[2], "");
    assertEquals(split[3], "three");
    assertEquals(split[4], "four");
});