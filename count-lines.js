let inCode = false

function countLines(code) {
  const linesWithContent = code.split('\n').filter((line) => {
    const trimmedLine = line.trim()

    if (inBackticks(trimmedLine)) {
      return true
    }

    if (lineStartsWithComment(trimmedLine)) {
      return false
    }

    return trimmedLine
  })

  return linesWithContent.length
}

const lineStartsWithComment = (line) => line.startsWith('//') || line.startsWith('/*') || line.startsWith('*')

const inBackticks = (line) => {
  const backtickOpened = (line.match(/`/g) || []).length % 2

  if (!backtickOpened && inCode) {
    return true
  }

  if (backtickOpened && !inCode) {
    inCode = true
    return true
  }

  if (backtickOpened && inCode) {
    inCode = false
    return true
  }
}

module.exports = countLines
