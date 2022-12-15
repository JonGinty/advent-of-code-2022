import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getCoordsFromLine } from "./tunneltools.ts";

Deno.test("Reading grid coords", () => {
    const l = "Sensor at x=2, y=18: closest beacon is at x=-2, y=15";
    assertEquals(getCoordsFromLine(l), [{x:2, y:18}, {x:-2, y:15}]);
})