function countLines(code) {
  // 1. return 0;
  //
  // 2. let adjusted = code.split('\n').map(c => c.trim()).filter(l => l.length > 0)
  //
  // 3. let adjusted = code.split('\n').map(c => c.trim()).filter(l => l.length > 0).filter(l => !l.startsWith('//'));
  //

  let adjusted = code
    .split('\n')
    .map(c => c.trim())
    .filter(l => l.length > 0);

  let adjusted2 = [];
  let startCol = -1;

  for (let idx = 0; idx < adjusted.length; idx++) {
    let line = adjusted[idx];

    if (startCol === -1) {
      startCol = line.indexOf('/*');
    }

    while (startCol >= 0 && line.indexOf('*/', startCol) >= 0) {
      commentStartLine = idx;
      startCol = startCol;

      let endCol = line.indexOf('*/', startCol);
      if (endCol >= 0) {
        line = line.slice(0, startCol) + line.slice(endCol + 2);
        startCol = line.indexOf('/*');
      } else {
        startCol = -1;
      }
    }

    if ((startCol === -1 || startCol > 0) && line.length > 0) {
      if (!line.startsWith('//')) {
        adjusted2.push(line);
      }
    }

    if (startCol > 0) {
      startCol = 0;
    }
  }

  return adjusted2.length;
}

module.exports = countLines;
