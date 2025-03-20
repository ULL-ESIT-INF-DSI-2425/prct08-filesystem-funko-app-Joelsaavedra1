import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { FunkoManager } from "../funkoManager/funkoManager.js";
import { FunkoType, FunkoGenre } from "../funko/funko.js";

/**
 * This function validates the type and genre of a Funko
 * @param type - The type of the Funko
 * @param genre - The genre of the Funko
 */
const validateFunkoAttributes = (type, genre) => {
  if (!Object.values(FunkoType).includes(type))
    throw new Error("Invalid Funko type");
  if (!Object.values(FunkoGenre).includes(genre))
    throw new Error("Invalid Funko genre");
};

/**
 * This function creates a Funko object from the arguments
 * @param args - The arguments to create a Funko from
 * @returns A Funko object created from the arguments
 */
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
 * Initialize a FunkoManager instance
 * @param user - The user to initialize the FunkoManager with
 */
const initializeFunkoManager = (user) => new FunkoManager(user.toLowerCase());

/**
 * User and ID args
 */
const commonFunkoArgs = {
  user: { type: "string" as const, demandOption: true },
  ID: { type: "string" as const, demandOption: true },
};

/**
 * Funko attributes args
 */
const funkoAttributesArgs = {
  user: { type: "string" as const, demandOption: true },
  ID: { type: "string" as const, demandOption: true },
  name: { type: "string" as const, demandOption: true },
  description: { type: "string" as const, demandOption: true },
  type: { type: "string" as const, demandOption: true },
  genre: { type: "string" as const, demandOption: true },
  franchise: { type: "string" as const, demandOption: true },
  num_franchise: { type: "number" as const, demandOption: true },
  exclusive: { type: "boolean" as const, demandOption: true },
  specialFeatures: { type: "string" as const, demandOption: true },
  market_value: { type: "number" as const, demandOption: true },
};

/**
 * Main function
 */
const args = yargs(hideBin(process.argv))
  .command("add", "Add a new Funko", funkoAttributesArgs, (args) => {
    const funkoManager = initializeFunkoManager(args.user);
    console.log(funkoManager.addFunko(createFunkoFromArgs(args)));
  })
  .command("remove", "Remove a Funko", commonFunkoArgs, (args) => {
    const funkoManager = initializeFunkoManager(args.user);
    console.log(funkoManager.removeFunko(args.ID));
  })
  .command("update", "Update a Funko info", funkoAttributesArgs, (args) => {
    const funkoManager = initializeFunkoManager(args.user);
    console.log(funkoManager.updateFunko(createFunkoFromArgs(args)));
  })
  .command("show", "Show a Funko", commonFunkoArgs, (args) => {
    const funkoManager = initializeFunkoManager(args.user);
    console.log(funkoManager.showFunko(args.ID));
  })
  .command(
    "list",
    "List all Funkos",
    { user: { type: "string", demandOption: true } },
    (args) => {
      const funkoManager = initializeFunkoManager(args.user);
      console.log(funkoManager.listFunkos());
    },
  )
  .help().argv;
