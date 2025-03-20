import { test, describe, expect, beforeAll, afterAll } from "vitest";
import { FunkoManager } from "../../src/funkoManager/funkoManager";
import { Funko, FunkoType, FunkoGenre } from "../../src/funko/funko";

const userCollection = new FunkoManager("test");
const funko1: Funko = {
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
const funko2: Funko = {
  ID: "2",
  name: "Superman",
  description: "Superman Funko Pop",
  type: FunkoType.VYNIL_GOLD,
  genre: FunkoGenre.ANIME,
  franchise: "X",
  num_franchise: 2,
  exclusive: false,
  special_specs: "Glow in the dark",
  market_value: 200,
};
const funko3: Funko = {
  ID: "1",
  name: "Spiderman",
  description: "Spiderman Funko Pop",
  type: FunkoType.POP,
  genre: FunkoGenre.MOVIES_TV,
  franchise: "Marvel",
  num_franchise: 1,
  exclusive: false,
  special_specs: "Glow in the dark",
  market_value: 20,
};
const funko4: Funko = {
  ID: "4",
  name: "Ironman",
  description: "Ironman Funko Pop",
  type: FunkoType.POP,
  genre: FunkoGenre.MOVIES_TV,
  franchise: "Marvel",
  num_franchise: 2,
  exclusive: false,
  special_specs: "Glow in the dark",
  market_value: 50,
};

beforeAll(() => {
  userCollection.removeFunko(funko1.ID);
  userCollection.removeFunko(funko2.ID);
  userCollection.removeFunko(funko3.ID);
  userCollection.removeFunko(funko4.ID);
});

afterAll(() => {
  userCollection.removeFunko(funko1.ID);
  userCollection.removeFunko(funko2.ID);
  userCollection.removeFunko(funko3.ID);
  userCollection.removeFunko(funko4.ID);
});

describe("Add Funko", () => {
  test("should be able to add a funko", () => {
    expect(userCollection.addFunko(funko1)).toBe(
      "New Funko added to test collection!",
    );
  });
  test("should not be able to add the same funko", () => {
    expect(userCollection.addFunko(funko1)).toBe(
      "Funko already exists at test collection!",
    );
  });
});

describe("Update Funko", () => {
  test("should be able to update a funko", () => {
    expect(userCollection.updateFunko(funko1)).toBe(
      "Funko updated at test collection!",
    );
  });
  test("should not be able to update a funko that does not exist", () => {
    expect(userCollection.updateFunko(funko2)).toBe(
      "Funko not found at test collection!",
    );
  });
});

describe("Remove Funko", () => {
  test("should be able to remove a funko", () => {
    userCollection.addFunko(funko2);
    expect(userCollection.removeFunko(funko2.ID)).toBe(
      "Funko removed from test collection!",
    );
  });
  test("should not be able to remove a funko that does not exist", () => {
    expect(userCollection.removeFunko(funko2.ID)).toBe(
      "Funko not found at test collection!",
    );
  });
});

describe("List Funkos", () => {
  test("should be able to list funkos", () => {
    userCollection.addFunko(funko1);
    userCollection.addFunko(funko2);
    userCollection.addFunko(funko3);
    userCollection.addFunko(funko4);
    const output = `test Funko Pop Collection\n------------------------------------------------\nID: 1\nName: Spiderman\nDescription: Spiderman Funko Pop\nType: Pop!\nGenre: Movies and TV\nFranchise: Marvel\nNumber in Franchise: 1\nExclusive: false\nSpecial Specs: Glow in the dark\nMarket Value: 20\n------------------------------------------------\nID: 2\nName: Superman\nDescription: Superman Funko Pop\nType: Vynil Gold\nGenre: Anime\nFranchise: X\nNumber in Franchise: 2\nExclusive: false\nSpecial Specs: Glow in the dark\nMarket Value: 200\n------------------------------------------------\nID: 3\nName: Batman\nDescription: Batman Funko Pop\nType: Pop!\nGenre: Movies and TV\nFranchise: DC\nNumber in Franchise: 1\nExclusive: false\nSpecial Specs: Glow in the dark\nMarket Value: 100\n------------------------------------------------\nID: 4\nName: Ironman\nDescription: Ironman Funko Pop\nType: Pop!\nGenre: Movies and TV\nFranchise: Marvel\nNumber in Franchise: 2\nExclusive: false\nSpecial Specs: Glow in the dark\nMarket Value: 50\n------------------------------------------------\n`;
    expect(userCollection.listFunkos()).toBe(output);
  });
  test("should not be able to list funkos if there are none", () => {
    userCollection.removeFunko(funko1.ID);
    userCollection.removeFunko(funko2.ID);
    userCollection.removeFunko(funko3.ID);
    userCollection.removeFunko(funko4.ID);
    const output = "No Funko Pops found at test collection!";
    expect(userCollection.listFunkos()).toBe(output);
  });
});

describe("Show Funko", () => {
  test("should be able to show a funko", () => {
    userCollection.addFunko(funko1);
    const output =
      "test Funko with ID 3\n------------------------------------------------\nID: 3\nName: Batman\nDescription: Batman Funko Pop\nType: Pop!\nGenre: Movies and TV\nFranchise: DC\nNumber in Franchise: 1\nExclusive: false\nSpecial Specs: Glow in the dark\nMarket Value: 100\n------------------------------------------------";
    expect(userCollection.showFunko(funko1.ID)).toBe(output);
  });
  test("should be able to show a funko", () => {
    userCollection.addFunko(funko2);
    const output =
      "test Funko with ID 2\n------------------------------------------------\nID: 2\nName: Superman\nDescription: Superman Funko Pop\nType: Vynil Gold\nGenre: Anime\nFranchise: X\nNumber in Franchise: 2\nExclusive: false\nSpecial Specs: Glow in the dark\nMarket Value: 200\n------------------------------------------------";
    expect(userCollection.showFunko(funko2.ID)).toBe(output);
  });
  test("should be able to show a funko", () => {
    userCollection.addFunko(funko3);
    const output =
      "test Funko with ID 1\n------------------------------------------------\nID: 1\nName: Spiderman\nDescription: Spiderman Funko Pop\nType: Pop!\nGenre: Movies and TV\nFranchise: Marvel\nNumber in Franchise: 1\nExclusive: false\nSpecial Specs: Glow in the dark\nMarket Value: 20\n------------------------------------------------";
    expect(userCollection.showFunko(funko3.ID)).toBe(output);
  });
  test("should be able to show a funko", () => {
    userCollection.addFunko(funko4);
    const output =
      "test Funko with ID 4\n------------------------------------------------\nID: 4\nName: Ironman\nDescription: Ironman Funko Pop\nType: Pop!\nGenre: Movies and TV\nFranchise: Marvel\nNumber in Franchise: 2\nExclusive: false\nSpecial Specs: Glow in the dark\nMarket Value: 50\n------------------------------------------------";
    expect(userCollection.showFunko(funko4.ID)).toBe(output);
  });
  test("should not be able to show a funko that does not exist", () => {
    userCollection.removeFunko(funko2.ID);
    expect(userCollection.showFunko(funko2.ID)).toBe(
      "Funko not found at test collection!",
    );
  });
});
