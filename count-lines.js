function removeComments(code) {
  let codeWithoutMultilineComments = "";

  let inAComment = false;
  let commentChar = "";

  let inMultilineComment = false;

  for (let i = 0; i < code.length - 1; i++) {
    if (!inAComment) {
      if (["`", '"', "'"].includes(code[i])) {
        inAComment = true;
      } else if (code[i] === "/") {
        if (inMultilineComment && code[i - 1] === "*" && code[i - 2] !== "/") {
          inMultilineComment = false;
          continue;
        } else if (!inMultilineComment && code[i + 1] === "*") {
          inMultilineComment = true;
        }
      }
    } else {
      if (code[i] === commentChar) {
        inAComment = false;
      }
    }
    if (!inMultilineComment) {
      codeWithoutMultilineComments += code[i];
    }
  }

  return codeWithoutMultilineComments;
}

function countLines(code) {
  const trimmedCode = code.trim();
  if (trimmedCode.length === 0) {
    return 0;
  }
  const lines = removeComments(trimmedCode).split("\n");
  let linesOfCode = 0;
  lines.forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith("//")) {
      return;
    }
    linesOfCode += 1;
  });
  return linesOfCode;
}

module.exports = countLines;
