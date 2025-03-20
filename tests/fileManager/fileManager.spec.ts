import { test, describe, expect, beforeAll, afterAll } from "vitest";
import { FileManager } from "../../src/fileManager/fileManager";
import { Funko, FunkoGenre, FunkoType } from "../../src/funko/funko";
import fs from "fs";
import path from "path";

const funko: Funko = {
  ID: "3",
  name: "Batman",
  description: "Batman Funko Pop",
  type: FunkoType.POP,
  genre: FunkoGenre.MOVIES_TV,
  franchise: "DC",
  num_franchise: 1,
  exclusive: false,
  special_specs: "Glow in the dark",
  market_value: 100,
};

beforeAll(() => {
  const userDir = path.join(__dirname, "../../users/user1");
  if (fs.existsSync(userDir)) {
    fs.rmdirSync(userDir, { recursive: true });
  }
});

afterAll(() => {
  const userDir = path.join(__dirname, "../../users/user1");
  if (fs.existsSync(userDir)) {
    fs.rmdirSync(userDir, { recursive: true });
  }
});

describe("Create a user that doesn't exist", () => {
  test("Create the user", () => {
    const fileManager = new FileManager("user1");
    expect(fileManager).toBeDefined();
  });
});

describe("Create a user that already exists", () => {
  test("Create the user", () => {
    const fileManager = new FileManager("user1");
    expect(fileManager).toBeDefined();
  });
});

describe("Save and get a funko", () => {
  test("Save and get a funko", () => {
    const fileManager = new FileManager("user1");
    fileManager.saveFunko(funko);
    const funko2 = fileManager.getFunko("3");
    expect(funko2).toEqual(funko);
  });
  test("Get a funko that doesn't exist", () => {
    const fileManager = new FileManager("user1");
    const funko2 = fileManager.getFunko("4");
    expect(funko2).toBeNull();
  });
});

describe("Get all the funkos", () => {
  test("Get all the funkos", () => {
    const fileManager = new FileManager("user1");
    const funkos = fileManager.getAllFunkos();
    expect(funkos).toEqual([funko]);
  });
});
