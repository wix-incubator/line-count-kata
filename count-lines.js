function notEmptyOrComment(line) {
  const trimmedLine = line.trim()
  return trimmedLine.length !== 0 && !trimmedLine.startsWith("//");
}

function isAdditionalStringLiteralDetected(line) {
  const lineWithoutEscapedSlashes = line.replace(/\\\\/g, '');
  const lineWithoutEscapedBackticks = lineWithoutEscapedSlashes.replace(/\\`/g, '');

  return (lineWithoutEscapedBackticks.match(/`/g) || []).length % 2 === 1;
}

function removeBlockComments(code) {
  return code.replace(/\/\*(.|\n)*?\*\//g, '')
}

function countLines(code) {
  const lines = removeBlockComments(code).split('\n');

  let count = 0;
  let isStringLiteral = false;

  lines.forEach(line => {
    if (isAdditionalStringLiteralDetected(line)) {
      isStringLiteral = !isStringLiteral;
    }

    if (isStringLiteral || notEmptyOrComment(line)) {
      count++;
    }

  })

  return count;
}

module.exports = countLines;
