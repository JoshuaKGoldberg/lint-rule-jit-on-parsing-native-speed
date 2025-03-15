import swc from "@swc/core/visitor.js";

class MyVisitor extends swc.Visitor {
  results = [];

  constructor(fileName) {
    super();
    this.fileName = fileName;
    this.id = fileName.match(/(\d+)/)[0];
  }

  visitNumericLiteral(literal) {
    if (this.id === literal.value.toString().padStart(4, "0")) {
      this.results.push({
        fileName: this.fileName,
        span: literal.span,
        message: "Numeric literal happens to match file name",
      });
    }
    return literal;
  }
}

export function lintAST(ast, fileName, results) {
  const visitor = new MyVisitor(fileName);

  visitor.visitProgram(ast);

  results.push(...visitor.results);
}
