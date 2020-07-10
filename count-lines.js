const MULTI_LINE_COMMENT = "MULTI_LINE_COMMENT";
const MULTI_LINE_STRING = "MULTI_LINE_STRING";

let scope = null;

const trim = (s) => s.trim();

const isSourceCode = (line) => {
  let lastChar = null;
  let hasCode = false;
  for (char of line) {
    const substr = lastChar + char;
    if (scope === null && substr === "//") {
      return hasCode;
    } else if (scope === null && substr === "/*") {
      scope = MULTI_LINE_COMMENT;
    } else if (scope === MULTI_LINE_COMMENT && substr === "*/") {
      scope = null;
    } else if (scope === null && char === "`") {
      scope = MULTI_LINE_STRING;
      hasCode = true;
    } else if (scope === MULTI_LINE_STRING && char === "`") {
      scope = null;
      hasCode = true;
    } else if (scope !== MULTI_LINE_COMMENT && lastChar) {
      hasCode = true;
    }
    lastChar = char;
  }
  return hasCode;
};

function countLines(code) {
  const lines = code.split("\n").map(trim);
  const codeLines = lines.filter(isSourceCode);
  return codeLines.length;
}

module.exports = countLines;
