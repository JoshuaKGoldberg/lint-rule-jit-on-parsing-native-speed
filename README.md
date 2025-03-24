# Point of Comparison: Lint Rule at JIT Speed with Parsing at Native Speed

> 📝 Associated blog post: [Hybrid Linters: The Best of Both Worlds](https://www.joshuakgoldberg.com/blog/hybrid-linters-the-best-of-both-worlds)

This is a proof-of-concept performance test showing:

1. Parsing source code with swc (native speed), then...
2. Running a rudimentary lint rule written in JavaScript (JIT speed) on the AST

```shell
npm i
node seed.js
```

## Measurements

Examples from running on an M1 Mac Studio, showing:

| Files Count | Time (Approx.)   |
| ----------- | ---------------- |
| 100         | 90 milliseconds  |
| 1,000       | 350 milliseconds |
| 10,000      | 2.9 seconds      |

```plaintext
 $ hyperfine "node run.js 100" --warmup 3 
Benchmark 1: node run.js 100
  Time (mean ± σ):      88.1 ms ±   0.9 ms    [User: 94.5 ms, System: 11.2 ms]
  Range (min … max):    85.7 ms …  89.6 ms    32 runs
```

```plaintext
$ hyperfine "node run.js 1000" --warmup 3 
Benchmark 1: node run.js 1000
  Time (mean ± σ):     348.8 ms ±   6.4 ms    [User: 362.8 ms, System: 33.9 ms]
  Range (min … max):   343.0 ms … 365.9 ms    10 runs
```

```plaintext
$ hyperfine "node run.js 10000" --warmup 3
Benchmark 1: node run.js 10000
  Time (mean ± σ):      2.852 s ±  0.019 s    [User: 2.730 s, System: 0.262 s]
  Range (min … max):    2.819 s …  2.874 s    10 runs
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
This proof of concept shows at least that the impact of sending file data parsed by native code into JavaScript execution is not a significant bottleneck.
