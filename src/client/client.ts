import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { FunkoManager } from "../funkoManager/funkoManager.js";
import { Funko, FunkoType, FunkoGenre } from "../funko/funko.js";

/**
 * Main function that handles the command line arguments
 * The commands are:
 * - add: Add a new Funko
 * - remove: Remove a Funko
 * - update: Update a Funko information
 * - show: Show a Funko
 * - list: List all Funkos
 */
yargs(hideBin(process.argv))
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
      if (!Object.values(FunkoType).includes(args.type as FunkoType)) {
        throw new Error("Invalid Funko type");
      }
      if (!Object.values(FunkoGenre).includes(args.genre as FunkoGenre)) {
        throw new Error("Invalid Funko genre");
      }
      const funkoManager = new FunkoManager(args.user.toLowerCase());
      const funko: Funko = {
        ID: args.ID,
        name: args.name,
        description: args.description,
        type: args.type as FunkoType,
        genre: args.genre as FunkoGenre,
        franchise: args.franchise,
        num_franchise: args.num_franchise,
        exclusive: args.exclusive,
        special_specs: args.specialFeatures,
        market_value: args.market_value,
      };
      console.log(funkoManager.addFunko(funko));
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
      const funkoManager = new FunkoManager(args.user.toLocaleLowerCase());
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
      if (!Object.values(FunkoType).includes(args.type as FunkoType)) {
        throw new Error("Invalid Funko type");
      }
      if (!Object.values(FunkoGenre).includes(args.genre as FunkoGenre)) {
        throw new Error("Invalid Funko genre");
      }
      const funkoManager = new FunkoManager(args.user.toLocaleLowerCase());
      const funko: Funko = {
        ID: args.ID,
        name: args.name,
        description: args.description,
        type: args.type as FunkoType,
        genre: args.genre as FunkoGenre,
        franchise: args.franchise,
        num_franchise: args.num_franchise,
        exclusive: args.exclusive,
        special_specs: args.specialFeatures,
        market_value: args.market_value,
      };
      console.log(funkoManager.updateFunko(funko));
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
      const funkoManager = new FunkoManager(args.user.toLocaleLowerCase());
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
