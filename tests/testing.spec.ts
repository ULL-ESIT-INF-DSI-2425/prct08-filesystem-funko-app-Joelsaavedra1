import { describe, expect, test } from "vitest";
import { add } from "../src/testing";

describe("add function tests", () => {
  test("add(1, 8) returns value 9", () => {
    expect(add(1, 8)).toBe(9);
  });

  test("add(-1, 8) returns value 7", () => {
    expect(add(-1, 8)).toBe(7);
  });
});