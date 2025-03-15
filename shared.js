import path from "node:path";

export const GENERATED_DIR = "./files";

export const EXAMPLE_FILE = './example.js'

export const NUMBER_OF_FILES = 10_000;

export const makeFileName = (index) =>
  path.join(GENERATED_DIR, `file-${index.toString().padStart(4, "0")}.js`);
