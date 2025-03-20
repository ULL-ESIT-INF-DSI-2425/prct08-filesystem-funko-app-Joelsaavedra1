import { Funko } from "../funko/funko.js";
import { FileManager } from "../fileManager/fileManager.js";
import chalk, { ChalkInstance } from "chalk";

/**
 * Class that realizes the functions to manage a Funko Pop collection.
 */
export class FunkoManager {
  /**
   * FileManager instance to manage the file system.
   */
  private fileManager: FileManager;

  /**
   * Constructor of the class.
   * @param user - The user that owns the collection.
   */
  constructor(private user: string) {
    this.fileManager = new FileManager(user.toLowerCase());
  }
  /**
   * This method adds a new Funko Pop to the collection.
   * @param funko - The Funko Pop to be added to the collection.
   */
  addFunko(funko: Funko): string {
    let output = "";
    if (this.fileManager.exists(funko.ID)) {
      output = chalk.red(`Funko already exists at ${this.user} collection!`);
    } else {
      this.fileManager.saveFunko(funko);
      output = chalk.green(`New Funko added to ${this.user} collection!`);
    }
    return output;
  }
  /**
   * This method updates a Funko Pop in the collection.
   * @param funko - The Funko Pop to be updated in the collection.
   */
  updateFunko(funko: Funko): string {
    let output = "";
    if (this.fileManager.exists(funko.ID)) {
      this.fileManager.saveFunko(funko);
      output = chalk.green(`Funko updated at ${this.user} collection!`);
    } else {
      output = chalk.red(`Funko not found at ${this.user} collection!`);
    }
    return output;
  }
  /**
   * This method removes a Funko Pop from the collection.
   * @param id - The ID of the Funko Pop to be removed from the collection.
   */
  removeFunko(id: string): string {
    let output = "";
    if (this.fileManager.deleteFunko(id)) {
      output = chalk.green(`Funko removed from ${this.user} collection!`);
    } else {
      output = chalk.red(`Funko not found at ${this.user} collection!`);
    }
    return output;
  }
  /**
   * This method lists all Funko Pops in the collection
   */
  listFunkos(): string {
    let output = "";
    const funkos = this.fileManager.getAllFunkos();
    if (funkos.length === 0) {
      output = chalk.red(`No Funko Pops found at ${this.user} collection!`);
    } else {
      let marketColor: ChalkInstance;
      output += chalk.green(`${this.user} Funko Pop Collection`) + "\n";
      output +=
        chalk.green("------------------------------------------------") + "\n";
      funkos.forEach((funko) => {
        if (funko.market_value < 50) marketColor = chalk.red;
        if (funko.market_value >= 50 && funko.market_value < 100)
          marketColor = chalk.magenta;
        if (funko.market_value >= 100 && funko.market_value < 200)
          marketColor = chalk.yellow;
        if (funko.market_value >= 200) marketColor = chalk.green;
        output += chalk.green(`ID: ${funko.ID}`) + "\n";
        output += chalk.green(`Name: ${funko.name}`) + "\n";
        output += chalk.green(`Description: ${funko.description}`) + "\n";
        output += chalk.green(`Type: ${funko.type}`) + "\n";
        output += chalk.green(`Genre: ${funko.genre}`) + "\n";
        output += chalk.green(`Franchise: ${funko.franchise}`) + "\n";
        output +=
          chalk.green(`Number in Franchise: ${funko.num_franchise}`) + "\n";
        output += chalk.green(`Exclusive: ${funko.exclusive}`) + "\n";
        output += chalk.green(`Special Specs: ${funko.special_specs}`) + "\n";
        output += marketColor(`Market Value: ${funko.market_value}`) + "\n";
        output +=
          chalk.green("------------------------------------------------") +
          "\n";
      });
    }
    return output;
  }
  /**
   * This method shows the details of a Funko Pop in the collection.
   * @param id - The ID of the Funko Pop to be shown.
   */
  showFunko(id: string): string {
    let output = "";
    if (this.fileManager.exists(id)) {
      const funko = this.fileManager.getFunko(id);
      if (funko) {
        let marketColor: ChalkInstance;
        output += chalk.green(`${this.user} Funko with ID ${id}`) + "\n";
        output +=
          chalk.green("------------------------------------------------") +
          "\n";
        if (funko.market_value < 50) marketColor = chalk.red;
        if (funko.market_value >= 50 && funko.market_value < 100)
          marketColor = chalk.magenta;
        if (funko.market_value >= 100 && funko.market_value < 200)
          marketColor = chalk.yellow;
        if (funko.market_value >= 200) marketColor = chalk.green;
        output += chalk.green(`ID: ${funko.ID}`) + "\n";
        output += chalk.green(`Name: ${funko.name}`) + "\n";
        output += chalk.green(`Description: ${funko.description}`) + "\n";
        output += chalk.green(`Type: ${funko.type}`) + "\n";
        output += chalk.green(`Genre: ${funko.genre}`) + "\n";
        output += chalk.green(`Franchise: ${funko.franchise}`) + "\n";
        output +=
          chalk.green(`Number in Franchise: ${funko.num_franchise}`) + "\n";
        output += chalk.green(`Exclusive: ${funko.exclusive}`) + "\n";
        output += chalk.green(`Special Specs: ${funko.special_specs}`) + "\n";
        output += marketColor(`Market Value: ${funko.market_value}`) + "\n";
        output += chalk.green(
          "------------------------------------------------",
        );
      }
    } else {
      output = chalk.red(`Funko not found at ${this.user} collection!`);
    }
    return output;
  }
}
