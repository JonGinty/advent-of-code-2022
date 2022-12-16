import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { buildRecordForValves, readValveFromInput, readValvesFromInput, valveScore } from "./valvetools.ts";

const input = "Valve BB has flow rate=13; tunnels lead to valves CC, AA";

const bigInput = 
`Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`

Deno.test("Valve parsing", () => {
    const valve = readValveFromInput(input);
    assertEquals(valve.key, "BB");
    assertEquals(valve.value, 13)
    assertEquals(valve.tunnels, ["CC", "AA"])
})

Deno.test("Valve shortest path", () => {
    const valves = readValvesFromInput(bigInput);
    //console.log(findShortestPathToEachValve(valves, "AA"));
    // console.log(rankValves(valves, 4, "AA"));
})

// Deno.test("valve score", () => {
//     const valves = readValvesFromInput(bigInput);
//     assertEquals(valveScore("AA", buildRecordForValves(valves),  [], 30), 1651);
// })