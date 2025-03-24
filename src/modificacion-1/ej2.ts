import * as fs from "fs";

/**
 * Este método recibe un objeto JSON y lo convierte a formato CSV.
 * @param obj - Objeto JSON
 * @returns Los datos del objeto JSON en formato CSV
 */
function printObj(obj): string {
  let data: string = "";
  for (let j in obj[0]) {
    data += j + ",";
  }
  data += "\n";
  for (let i in obj) {
    for (let j in obj[i]) {
      data += obj[i][j] + ",";
    }
    data += "\n";
  }
  return data;
}

/**
 * Esta función lee un archivo JSON y escribe un archivo CSV con los datos del JSON.
 * @param inputFile - Archivo de entrada JSON
 * @param outputFile - Archivo de salida CSV
 */
function readWriteFile(inputFile: string, outputFile: string) {
  let data_to_write: string = "";
  fs.readFile(inputFile, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err.message);
      return;
    }
    if (!data) {
      console.error("Error: El archivo está vacío.");
      return;
    }
    const obj = JSON.parse(data);
    data_to_write = printObj(obj);
    writeFileJSON(outputFile, data_to_write);
  });
}

/**
 * Este método escribe un archivo con los datos recibidos.
 * @param filePath - Ruta del archivo de salida
 * @param data - Datos a escribir en el archivo
 */
function writeFileJSON(filePath: string, data: string) {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error("Error al escribir el archivo:", err.message);
      return;
    }
  });
}

/**
 * Función principal
 */
function main() {
  const inputFile = process.argv[2];
  const outputFile = process.argv[3];
  readWriteFile(inputFile, outputFile);
}

main();
