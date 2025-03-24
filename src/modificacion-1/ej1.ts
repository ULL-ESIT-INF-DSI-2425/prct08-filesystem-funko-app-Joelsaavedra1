import * as fs from "fs";

/**
 * Método asíncrono para leer el contenido de un archivo.
 * @param filePath - Ruta del archivo a leer
 * @param keyword - Palabra clave a buscar
 */
function readFileAndCountKeyword(filePath: string, keyword: string) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err.message);
      return;
    }
    if (!data) {
      console.error("Error: El archivo está vacío.");
      return;
    }
    const ocurrences = countWord(data, keyword);
    console.log(
      `La palabra clave "${keyword}" aparece ${ocurrences} veces en el archivo.`,
    );
  });
}

/**
 * Este método cuenta el número de veces que aparece una palabra clave en un texto.
 * @param data - Cadena de texto del fichero
 * @param keyword - Palabra clave a buscar
 * @returns El número de veces que aparece la palabra clave en el texto
 */
function countWord(data: string, keyword: string): number {
  let count = 0;
  const words: string[] = data.split(" ");
  words.forEach((word) => {
    if (word === keyword) {
      ++count;
    }
  });
  return count;
}

/**
 * Función principal
 */
function main() {
  const filePath = process.argv[2];
  const keyword = process.argv[3];
  console.log("Leyendo archivo:", filePath);
  console.log("Palabra clave:", keyword);
  readFileAndCountKeyword(filePath, keyword);
}

main();
