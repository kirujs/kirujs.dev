import { ShikiTransformer, ThemedToken } from "shiki"

function splitAndColorTokens(
  tokens: ThemedToken[][],
  options: {
    bgColor: string
    matchStart: string
    matchEnd: string
  }
) {
  tokens.forEach((line) => {
    let matchStartIdx = line.findIndex((t) =>
      t.content.includes(options.matchStart)
    )
    if (matchStartIdx === -1) return

    // if the starting token or ending token isn't exclusively the matchStart or matchEnd,
    // split them into separate tokens
    if (line[matchStartIdx].content !== options.matchStart) {
      const [pre, post] = line[matchStartIdx].content.split(options.matchStart)
      if (post.length > 0) {
        line[matchStartIdx].content = pre
        const newToken = {
          content: post,
          bgColor: line[matchStartIdx].bgColor,
          offset: line[matchStartIdx].offset,
        }
        line.splice(matchStartIdx + 1, 0, newToken)
        matchStartIdx++
      }
    } else {
      line.splice(matchStartIdx, 1)
    }

    let matchEndIdx = line.findIndex((t) =>
      t.content.includes(options.matchEnd)
    )
    if (matchEndIdx === -1) {
      matchEndIdx = line.length
    }

    if (line[matchEndIdx].content !== options.matchEnd) {
      const [pre, post] = line[matchEndIdx].content.split(options.matchEnd)
      line[matchEndIdx].content = pre
      if (post.length > 0) {
        const newToken = {
          content: post,
          bgColor: line[matchEndIdx].bgColor,
          offset: line[matchEndIdx].offset,
        }
        line.splice(matchEndIdx + 1, 0, newToken)
      }
      matchEndIdx++
    } else {
      line.splice(matchEndIdx, 1)
    }

    for (let i = matchStartIdx; i <= matchEndIdx - 1; i++) {
      line[i].bgColor = options.bgColor
    }
  })
}

export function shikiInlineDiffNotation(): ShikiTransformer {
  return {
    name: "shiki-diff-notation",
    tokens(tokens) {
      splitAndColorTokens(tokens, {
        bgColor: "#173a4f",
        matchStart: "|~~",
        matchEnd: "~~|",
      })
      splitAndColorTokens(tokens, {
        bgColor: "#174327",
        matchStart: "|++",
        matchEnd: "++|",
      })
      splitAndColorTokens(tokens, {
        bgColor: "#512525",
        matchStart: "|--",
        matchEnd: "--|",
      })
    },
  }
}
