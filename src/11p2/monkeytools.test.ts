import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { readMonkeyFromInput } from "./monkeytools.ts";


const testMonkey = 
`Monkey 0:
  Starting items: 97, 81, 57, 57, 91, 61
  Operation: new = old * 7
  Test: divisible by 11
    If true: throw to monkey 5
    If false: throw to monkey 6`

Deno.test("reading monkey", () => {
    const monkey = readMonkeyFromInput(testMonkey);
    assertEquals(monkey.id, 0);
    assertEquals(monkey.items.length, 6);
    assertEquals(monkey.items[0], 97n);
    assertEquals(monkey.items[5], 61n);
    assertEquals(monkey.operation(2n), 14n);
    assertEquals(monkey.test(22n), true);
    assertEquals(monkey.test(23n), false);
    assertEquals(monkey.ifTrue, 5);
    assertEquals(monkey.ifFalse, 6);
})