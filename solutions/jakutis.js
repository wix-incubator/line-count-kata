function countLines(code) {
  let inComment = false
  let commentStartedAtLineStart = false
  let inString = false
  let inMultilineString = false
  let newCode = ''
  for (let i = 0; i < code.length; i++) {
    if (!inComment && !inString && code[i] === '`' && code[i - 1] !== '\\') {
      newCode += code[i]
      inMultilineString = !inMultilineString
      continue
    }

    const beforeInComment = inComment
    if (!inComment && !inString) {
      if (code[i - 1] === '/' && code[i] === '*') {
        if (!inMultilineString) {
          inComment = true
          commentStartedAtLineStart = code[i - 2] === '\n'
          newCode = newCode.substr(0, newCode.length - 1)
        }
      } else {
        if (code[i] === '"' || code[i] === "'") {
          inString = true
        }
      }
    } else if (!inComment && inString) {
      if (code[i - 1] !== '\\' && (code[i] === '"' && code[i] === "'")) {
        inString = false
      }
    } else if (inComment) {
      if (code[i - 1] === '*' && code[i] === '/') {
        inComment = false
        if (commentStartedAtLineStart && code[i + 1] === '\n') {
          i++
        }
      }
    }
    const justClosedComment = beforeInComment && !inComment

    if (!inComment && !justClosedComment) {
      newCode += code[i]
    }
  }
  newCode = newCode
    .split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('//'))
  return newCode.length
}

module.exports = countLines;
