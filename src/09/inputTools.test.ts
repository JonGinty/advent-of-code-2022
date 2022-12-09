
import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { xyDiff } from "./inputTools.ts";

Deno.test("xy diff", () => {
    assertEquals(xyDiff([1,2], [3,5])[0], -2);
    assertEquals(xyDiff([1,2], [3,5])[1], -3);
    assertEquals(xyDiff([1,2], [3,5], true)[0], 2);
    assertEquals(xyDiff([1,2], [3,5], true)[1], 3);
})