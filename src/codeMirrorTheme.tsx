/**
 * adapted from https://github.com/codemirror/theme-one-dark/blob/main/src/one-dark.ts
 */
import { EditorView } from "@codemirror/view"
import { Extension } from "@codemirror/state"
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { tags as t } from "@lezer/highlight"

// const chalky = "#e5c07b",
//   coral = "#e06c75",
//   invalid = "#ffffff",
//   ivory = "#abb2bf",
//   stone = "#7d8799", // Brightened compared to original to increase contrast
//   whiskey = "#d19a66",
//   darkBackground = "#1117",
//   highlightBackground = "#2c313a",
//   background = "#1117",
//   tooltipBackground = "#353a42",
//   selection = "#fff3",
//   cursor = "white",
//   purple = "#B392F0",
//   paleRed = "#F97583",
//   darkRed = "#e8585c"

const ivory = "#abb2bf",
  highlightBackground = "#2c313a",
  background = "#1117",
  tooltipBackground = "#353a42",
  selection = "#fff3",
  cursor = "white"
/// The editor theme styles for One Dark.
const editorTheme = EditorView.theme(
  {
    "&": {
      color: "#fde3e3",
      //backgroundColor: "#111a",
    },
    ".cm-content": {
      caretColor: cursor,
    },

    ".cm-cursor, .cm-dropCursor": { borderLeftColor: cursor },
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
      { backgroundColor: selection },

    //".cm-panels": { backgroundColor: darkBackground, color: ivory },
    //".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
    //".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },

    ".cm-searchMatch": {
      backgroundColor: "#72a1ff59",
      outline: "1px solid #457dff",
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f",
    },

    ".cm-activeLine": { backgroundColor: "#fff1" },
    ".cm-selectionMatch": { backgroundColor: "#fff3" },

    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: "#bad0f847",
    },

    ".cm-gutters": {
      backgroundColor: background,
      color: "#888",
      border: "none",
    },

    ".cm-activeLineGutter": {
      backgroundColor: highlightBackground,
    },

    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd",
    },

    ".cm-tooltip": {
      border: "none",
      backgroundColor: tooltipBackground,
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: tooltipBackground,
      borderBottomColor: tooltipBackground,
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        backgroundColor: highlightBackground,
        color: ivory,
      },
    },
  },
  { dark: true }
)

// The highlighting style for code in the One Dark theme.
// const kaiokenHighlightStyle = HighlightStyle.define([
//   { tag: t.keyword, color: paleRed },
//   // {
//   //   tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
//   //   color: "#E1E4E8",
//   // },
//   {
//     tag: t.propertyName,
//     color: purple,
//   },
//   { tag: [t.function(t.variableName), t.labelName], color: purple },
//   { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: whiskey },
//   { tag: [t.definition(t.name), t.separator], color: "#E1E4E8" },
//   {
//     tag: [
//       t.typeName,
//       t.className,
//       t.number,
//       t.changed,
//       t.annotation,
//       t.modifier,
//       t.self,
//       t.namespace,
//     ],
//     color: darkRed,
//   },
//   {
//     tag: [
//       t.operator,
//       t.operatorKeyword,
//       t.url,
//       t.escape,
//       t.regexp,
//       t.link,
//       t.special(t.string),
//     ],
//     color: paleRed,
//   },
//   { tag: [t.meta, t.comment], color: stone },
//   { tag: t.strong, fontWeight: "bold" },
//   { tag: t.emphasis, fontStyle: "italic" },
//   { tag: t.strikethrough, textDecoration: "line-through" },
//   { tag: t.link, color: stone, textDecoration: "underline" },
//   { tag: t.heading, fontWeight: "bold", color: coral },
//   { tag: [t.atom, t.bool, t.special(t.variableName)], color: whiskey },
//   { tag: [t.processingInstruction, t.string, t.inserted], color: "#fde3e3" },
//   { tag: t.invalid, color: invalid },
// ])
const kaiokenHighlightStyle = HighlightStyle.define([
  { tag: t.comment, color: "#888" },
  { tag: t.function(t.variableName), color: "#B392F0" }, // Function names
  { tag: t.keyword, color: "#F97583" }, // Keywords
  { tag: t.variableName, color: "#f0a05e" }, // Variables
  { tag: t.string, color: "#fde3e3" }, // Strings and template literals
  { tag: t.number, color: "#f0a05e" }, // Numbers
  { tag: t.operator, color: "#F97583" }, // Operators
  { tag: t.typeName, color: "#e8585c" }, // JSX Elements
  { tag: t.attributeName, color: "#B392F0" }, // JSX attributes
  { tag: t.propertyName, color: "#e1e4e8" },
  { tag: t.function(t.propertyName), color: "#B392F0" },
])

/// Extension to enable the One Dark theme (both the editor theme and
/// the highlight style).
export const kaiokenTheme: Extension = [
  editorTheme,
  syntaxHighlighting(kaiokenHighlightStyle),
]
