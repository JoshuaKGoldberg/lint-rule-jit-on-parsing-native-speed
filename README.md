# Point of Comparison: Lint Rule at JIT Speed with Parsing at Native Speed

> 📝 Associated blog post: [Why I'd Write a Linter in TypeScript](https://joshuakgoldberg.com/blog/why-id-write-a-linter-in-typescript)

This is a proof-of-concept performance test showing:

1. Parsing source code with swc (native speed), then...
2. Running a rudimentary lint rule written in JavaScript (JIT speed) on the AST

```shell
npm i
node seed.js
```

## Measurements

Examples from running on an M1 Mac Studio, showing about 90 milliseconds to lint 100 files or about 350 milliseconds to lint 1,000 files:

```plaintext
$ hyperfine "node run.js 100" --warmup 3
Benchmark 1: node run.js 100
  Time (mean ± σ):      85.1 ms ±   1.2 ms    [User: 92.6 ms, System: 9.7 ms]
  Range (min … max):    82.9 ms …  88.3 ms    34 runs
```

```plaintext
$ hyperfine "node run.js 1000" --warmup 3
Benchmark 1: node run.js 1000
  Time (mean ± σ):     331.7 ms ±   1.8 ms    [User: 348.9 ms, System: 27.7 ms]
  Range (min … max):   329.7 ms … 335.8 ms    10 runs
```

> ⚡️ The excellent [sharkdp/hyerfine](https://github.com/sharkdp/hyperfine) was used for performance measurements.

## Source Explanation

1. `node generate.js`: creates 10,000 files with names like `files/file-0000.js` by copying `example.js`.
   Each file contains about 100 lines of real-world-ish syntax, including comments, closures, functions, and loops.
2. `node run.js`: parses those files with [`@swc/core`'s `parseFile`](https://swc.rs/docs/usage/core#parsefile), then passes the parsed AST to...
3. `lint.js`: creates and runs an instance of a very rudimentary visitor using the deprecated `swc.Visitor`.
   It visits each node in an AST, and arbitrarily reports when it sees a numeric literal of a particular value based on filename.

### Caveats

Real-world linting includes many more heavyweight operations:

1. Calling to (soon, ideally native speed) type checking APIs
2. Much larger ASTs
3. Scope analysis

The purpose of this measurement is not to indicate the expected performance of a mixed JIT and native speed linter.
The purpose is only to get rough starting baselines for the scale of speeds: whether we linting a hundred files takes, say, a hundred milliseconds verses a full second.
