import { buildTotals } from "./buildTotals.ts";
import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts"; 

Deno.test("build totals", () => {
    const raw = [
        "10",
        "20.1",
        "30",
        "",
        "1",
        "2",
        "3",
        "",
        "4",
        "5",
        "6"
    ]
    const totals = buildTotals(raw);
    assertEquals(totals.length, 3);
    assertEquals(totals[0], 60.1);
    assertEquals(totals[1], 6);
    assertEquals(totals[2], 15);
});