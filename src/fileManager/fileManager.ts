import fs from "fs";
import path from "path";
import { Funko } from "../funko/funko.js";

export class FileManager {
  private userPath: string;

  constructor(private user: string) {
    this.userPath = path.join("users", user);
    if (!fs.existsSync(this.userPath)) {
      fs.mkdirSync(this.userPath, { recursive: true });
    }
  }

  saveFunko(funko: Funko): void {
    const filePath = path.join(this.userPath, `${funko.ID}.json`);
    console.log("📂 Guardando en:", filePath);
    fs.writeFileSync(filePath, JSON.stringify(funko, null, 2));
  }

  getFunko(id: string): Funko | null {
    const filePath = path.join(this.userPath, `${id}.json`);
    if (!fs.existsSync(filePath)) return null;
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  }

  getAllFunkos(): Funko[] {
    if (!fs.existsSync(this.userPath)) return [];
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

  deleteFunko(id: string): boolean {
    const filePath = path.join(this.userPath, `${id}.json`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  }

  exists(id: string): boolean {
    const filePath = path.join(this.userPath, `${id}.json`);
    return fs.existsSync(filePath);
  }
}
