// An example file to test swc parsing.

console.error("This never gets run.");

/*
It has all sorts of different syntax.
Including... // ... /* /*
... multi-line comments.
*/

class MyExampleClass {
  #privateField = 42;

  constructor() {
    this.publicField = 100;
  }

  myMethod() {
    console.log("Hello, world!");
  }

  static myStaticMethod() {
    console.log("Hello from static method!");
  }

  static #myPrivateStaticField = 200;

  static #myPrivateStaticMethod() {
    console.log("Hello from private static method!");
  }

  static callPrivateStaticMethod() {
    this.#myPrivateStaticMethod();
  }

  get privateField() {
    return this.#privateField;
  }

  set privateField(value) {
    this.#privateField = value;
  }

  static get myPrivateStaticField() {
    return this.#myPrivateStaticField;
  }
}

const instance = new MyExampleClass();

instance.myMethod();
console.log(instance.privateField);

instance.privateField = 50;
console.log(instance.privateField);

const factories = [
  () => new MyExampleClass(),
  () => MyExampleClass.myPrivateStaticField,
  () => MyExampleClass.callPrivateStaticMethod(),
];

async function main() {
  for (const factory of factories) {
    console.log(factory());
  }
}

((abc) =>
  (
    (defGHI) => (jklMNOpQr) =>
      abc[defGHI][jklMNOpQr]
  )())()();
  ((abc) =>
    (
      (defGHI) => (jklMNOpQr) =>
        abc[defGHI][jklMNOpQr]
    )())()();
    ((abc) =>
      (
        (defGHI) => (jklMNOpQr) =>
          abc[defGHI][jklMNOpQr]
      )())()();
      ((abc) =>
        (
          (defGHI) => (jklMNOpQr) =>
            abc[defGHI][jklMNOpQr]
        )())()();
        ((abc) =>
          (
            (defGHI) => (jklMNOpQr) =>
              abc[defGHI][jklMNOpQr]
          )())()();
          ((abc) =>
            (
              (defGHI) => (jklMNOpQr) =>
                abc[defGHI][jklMNOpQr]
            )())()();
                              

main().catch(console.error);
