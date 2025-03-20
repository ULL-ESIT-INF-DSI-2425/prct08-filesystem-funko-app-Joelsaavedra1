import fs from "fs";
import path from "path";
import { Funko } from "../funko/funko.js";

/**
 * Class to manage the files of the funkos
 */
export class FileManager {
  /**
   * Path to the user's folder
   */
  private userPath: string;
  /**
   * Constructor of the FileManager
   * @param user - User's name
   */
  constructor(private user: string) {
    this.userPath = path.join("users", user);
    if (!fs.existsSync(this.userPath)) {
      fs.mkdirSync(this.userPath, { recursive: true });
    }
  }
  /**
   * This method saves a funko in a file
   * @param funko - Funko to save
   */
  saveFunko(funko: Funko): void {
    const filePath = path.join(this.userPath, `${funko.ID}.json`);
    fs.writeFileSync(filePath, JSON.stringify(funko, null, 2));
  }
  /**
   * This method gets a funko from a file
   * @param id - Funko's ID
   * @returns The funko with the ID or null if it doesn't exist
   */
  getFunko(id: string): Funko | null {
    const filePath = path.join(this.userPath, `${id}.json`);
    if (!this.exists(id)) return null;
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  }
  /**
   * This method gets all the funkos of the user
   * @returns An array with all the funkos
   */
  getAllFunkos(): Funko[] {
    const files = fs.readdirSync(this.userPath);
    const funkos: Funko[] = [];
    for (const file of files) {
      if (file.endsWith(".json")) {
        const data = fs.readFileSync(path.join(this.userPath, file), "utf-8");
        const funko: Funko = JSON.parse(data);
        funkos.push(funko);
      }
    }
    return funkos;
  }
  /**
   * This method deletes a funko
   * @param id - Funko's ID
   * @returns True if the funko was deleted, false if it doesn't exist
   */
  deleteFunko(id: string): boolean {
    const filePath = path.join(this.userPath, `${id}.json`);
    if (this.exists(id)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  }
  /**
   * This method checks if a funko exists
   * @param id - Funko's ID
   * @returns True if the funko exists, false if it doesn't
   */
  exists(id: string): boolean {
    const filePath = path.join(this.userPath, `${id}.json`);
    return fs.existsSync(filePath);
  }
}
