import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { FunkoManager } from "../funkoManager/funkoManager.js";
import { Funko, FunkoType, FunkoGenre } from "../funko/funko.js";

const validateFunkoAttributes = (type, genre) => {
  if (!Object.values(FunkoType).includes(type)) {
    throw new Error("Invalid Funko type");
  }
  if (!Object.values(FunkoGenre).includes(genre)) {
    throw new Error("Invalid Funko genre");
  }
};

const createFunkoFromArgs = (args) => {
  validateFunkoAttributes(args.type, args.genre);
  return {
    ID: args.ID,
    name: args.name,
    description: args.description,
    type: args.type,
    genre: args.genre,
    franchise: args.franchise,
    num_franchise: args.num_franchise,
    exclusive: args.exclusive,
    special_specs: args.specialFeatures,
    market_value: args.market_value,
  };
};
/**
 * Main function that handles the command line arguments
 * The commands are:
 * - add: Add a new Funko
 * - remove: Remove a Funko
 * - update: Update a Funko information
 * - show: Show a Funko
 * - list: List all Funkos
 */
const args = yargs(hideBin(process.argv))
  .command(
    "add",
    "Add a new Funko",
    {
      user: { type: "string", demandOption: true },
      ID: { type: "string", demandOption: true },
      name: { type: "string", demandOption: true },
      description: { type: "string", demandOption: true },
      type: { type: "string", demandOption: true },
      genre: { type: "string", demandOption: true },
      franchise: { type: "string", demandOption: true },
      num_franchise: { type: "number", demandOption: true },
      exclusive: { type: "boolean", demandOption: true },
      specialFeatures: { type: "string", demandOption: true },
      market_value: { type: "number", demandOption: true },
    },
    (args) => {
      const funkoManager = new FunkoManager(args.user.toLowerCase());
      console.log(funkoManager.addFunko(createFunkoFromArgs(args)));
    },
  )
  .command(
    "remove",
    "Remove a Funko",
    {
      user: { type: "string", demandOption: true },
      ID: { type: "string", demandOption: true },
    },
    (args) => {
      const funkoManager = new FunkoManager(args.user.toLowerCase());
      console.log(funkoManager.removeFunko(args.ID));
    },
  )
  .command(
    "update",
    "Update a Funko information",
    {
      user: { type: "string", demandOption: true },
      ID: { type: "string", demandOption: true },
      name: { type: "string", demandOption: true },
      description: { type: "string", demandOption: true },
      type: { type: "string", demandOption: true },
      genre: { type: "string", demandOption: true },
      franchise: { type: "string", demandOption: true },
      num_franchise: { type: "number", demandOption: true },
      exclusive: { type: "boolean", demandOption: true },
      specialFeatures: { type: "string", demandOption: true },
      market_value: { type: "number", demandOption: true },
    },
    (args) => {
      const funkoManager = new FunkoManager(args.user.toLowerCase());
      console.log(funkoManager.updateFunko(createFunkoFromArgs(args)));
    },
  )
  .command(
    "show",
    "Show a Funko",
    {
      user: { type: "string", demandOption: true },
      ID: { type: "string", demandOption: true },
    },
    (args) => {
      const funkoManager = new FunkoManager(args.user.toLowerCase());
      console.log(funkoManager.showFunko(args.ID));
    },
  )
  .command(
    "list",
    "List all Funkos",
    {
      user: { type: "string", demandOption: true },
    },
    (args) => {
      const funkoManager = new FunkoManager(args.user.toLowerCase());
      console.log(funkoManager.listFunkos());
    },
  )
  .help().argv;
