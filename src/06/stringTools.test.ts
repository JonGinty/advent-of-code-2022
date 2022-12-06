import { findUniqueStringLocation } from "./stringTools.ts";
import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

Deno.test("unique string index finder", () => {
    assertEquals(findUniqueStringLocation("bvwbjplbgvbhsrlpgdmjqwftvncz"), 5);
    assertEquals(findUniqueStringLocation("nppdvjthqldpwncqszvftbrmjlhg"), 6);
    assertEquals(findUniqueStringLocation("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"), 10);
    assertEquals(findUniqueStringLocation("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"), 11);
})