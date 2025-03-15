import fs from "node:fs/promises";

import { makeFileName, EXAMPLE_FILE, GENERATED_DIR, NUMBER_OF_FILES } from "./shared.js";

await fs.rm(GENERATED_DIR, { recursive: true, force: true });
await fs.mkdir(GENERATED_DIR);

for (let i = 0; i < NUMBER_OF_FILES; i++) {
  await fs.cp(EXAMPLE_FILE, makeFileName(i));
}
