import { charVal, splitInHalf, findCommonItems, valueOfCommonItemsForFullInput, findCommonItemsFromNonSplit } from "./stringManipulation.ts";
import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { splitByLine } from "../01/splitByLine.ts";

Deno.test("char val", () => {
    assertEquals(charVal("a"), 1);
    assertEquals(charVal("z"), 26);
    assertEquals(charVal("A"), 27);
    assertEquals(charVal("Z"), 52);
})

Deno.test("split in half", () => {
    assertEquals(splitInHalf("abcdef").left, "abc");
    assertEquals(splitInHalf("abcdef").right, "def");
    assertEquals(splitInHalf("ghikl").left, "gh");
    assertEquals(splitInHalf("ghikl").right, "ikl");
})

Deno.test("common chars", () => {
    assertEquals(findCommonItems("abc", "def"), "");
    assertEquals(findCommonItems("AbCdEfGhIjKl", "def"), "df");
    assertEquals(findCommonItemsFromNonSplit("vJrwpWtwJgWrhcsFMMfFFhFp"), "p");
    assertEquals(valueOfCommonItemsForFullInput("vJrwpWtwJgWrhcsFMMfFFhFp"), 16);
})

Deno.test("test input", () => {
const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`
const inputLines = splitByLine(input);
    assertEquals(findCommonItemsFromNonSplit(inputLines[0]), "p");
    assertEquals(valueOfCommonItemsForFullInput(inputLines[0]), 16);

    assertEquals(findCommonItemsFromNonSplit(inputLines[1]), "L");
    assertEquals(valueOfCommonItemsForFullInput(inputLines[1]), 38);

    assertEquals(valueOfCommonItemsForFullInput(input), 157);
})