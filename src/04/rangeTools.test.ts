import { checkOverlap, checkOverlapForFullLineInput, expandRange, getRangeFromInput } from "./rangeTools.ts";
import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";



Deno.test("range input", () => {
    const input = "3-11";
    const {min, max} = getRangeFromInput(input);
    const range = expandRange(min, max);
    assertEquals(range.length, 9);
    assertEquals(range[0], 3);
    assertEquals(range[8], 11);
    assertEquals(range[5], 8);
})

Deno.test("overlap checks", () => {
    assertEquals(checkOverlap("1-3", "1-2"), true);
    assertEquals(checkOverlap("1-3", "2-3"), true);
    assertEquals(checkOverlap("100-300", "101-202"), true);
    assertEquals(checkOverlapForFullLineInput("1-3,1-2"), true);
    assertEquals(checkOverlapForFullLineInput("1-3,2-3"), true);
    assertEquals(checkOverlapForFullLineInput("100-300,101-201"), true);
    assertEquals(checkOverlapForFullLineInput("1-2,2-3"), false);
    assertEquals(checkOverlapForFullLineInput("1-3,1-2"), true);
    assertEquals(checkOverlapForFullLineInput("1-3,1-2"), true);
})