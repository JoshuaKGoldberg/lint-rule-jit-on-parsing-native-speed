import swc from "@swc/core";

import { makeFileName } from "./shared.js";
import { lintAST } from "./lint.js";

const results = [];
const filesToLint = +process.argv[2];

for (let i = 0; i < filesToLint; i += 1) {
  const fileName = makeFileName(i);
  lintAST(await swc.parseFile(fileName), fileName, results);
}

for (const result of results) {
  console.log(`${result.fileName}@${result.span.start} - ${result.message}`);
}
