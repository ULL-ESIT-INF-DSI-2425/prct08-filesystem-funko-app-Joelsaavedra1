import { Funko } from "../funko/funko.js";
import { FileManager } from "../fileManager/fileManager.js";
import chalk from "chalk";

export class FunkoManager {
  private fileManager: FileManager;

  constructor(private user: string) {
    this.fileManager = new FileManager(user);
  }

  addFunko(funko: Funko): void {
    const log = console.log;
    if (this.fileManager.exists(funko.ID)) {
      log(chalk.red(`Funko already exists at ${this.user} collection!`));
    } else {
      this.fileManager.saveFunko(funko);
      log(chalk.green(`New Funko added to ${this.user} collection!`));
    }
  }

  updateFunko(funko: Funko): void {
    const log = console.log;
    if (this.fileManager.exists(funko.ID)) {
      this.fileManager.saveFunko(funko);
      log(chalk.green(`Funko updated at ${this.user} collection!`));
    } else {
      log(chalk.red(`Funko not found at ${this.user} collection!`));
    }
  }

  removeFunko(id: string): void {
    const log = console.log;
    if (this.fileManager.exists(id)) {
      this.fileManager.deleteFunko(id);
      log(chalk.green(`Funko removed from ${this.user} collection!`));
    } else {
      log(chalk.red(`Funko not found at ${this.user} collection!`));
    }
  }

  listFunkos() {
    const funkos = this.fileManager.getAllFunkos();
    const log = console.log;
    if (funkos.length === 0) {
      log(chalk.red(`No Funkos found at ${this.user} collection!`));
    } else {
      log(chalk.blue(`${this.user} Funko Pop collection:`));
      log(chalk.blue("----------------------------------------"));
      funkos.forEach((funko) => {
        log(chalk.blue(`ID: ${funko.ID}`));
        log(chalk.blue(`Name: ${funko.name}`));
        log(chalk.blue(`Description: ${funko.description}`));
        log(chalk.blue(`Type: ${funko.type}`));
        log(chalk.blue(`Genre: ${funko.genre}`));
        log(chalk.blue(`Franchise: ${funko.franchise}`));
        log(chalk.blue(`Number in Franchise: ${funko.num_franchise}`));
        log(chalk.blue(`Exclusive: ${funko.exclusive}`));
        log(chalk.blue(`Special Specs: ${funko.special_specs}`));
        log(chalk.blue(`Market Value: ${funko.market_value}`));
        log(chalk.blue("----------------------------------------"));
      });
    }
  }

  showFunko(id: string) {
    const log = console.log;
    if (this.fileManager.exists(id)) {
      const funko = this.fileManager.getFunko(id);
      if (funko) {
        log(chalk.blue(`ID: ${funko.ID}`));
        log(chalk.blue(`Name: ${funko.name}`));
        log(chalk.blue(`Description: ${funko.description}`));
        log(chalk.blue(`Type: ${funko.type}`));
        log(chalk.blue(`Genre: ${funko.genre}`));
        log(chalk.blue(`Franchise: ${funko.franchise}`));
        log(chalk.blue(`Number in Franchise: ${funko.num_franchise}`));
        log(chalk.blue(`Exclusive: ${funko.exclusive}`));
        log(chalk.blue(`Special Specs: ${funko.special_specs}`));
        log(chalk.blue(`Market Value: ${funko.market_value}`));
      }
    } else {
      log(chalk.red(`Funko not found at ${this.user} collection!`));
    }
  }
}