// Environment: server
import type { OnRenderHtmlAsync } from "vike/types"
import { dangerouslySkipEscape, escapeInject } from "vike/server"
import { renderToString } from "kaioken"
import { getDescription, getKeywords, getTitle } from "./utils"
import { App } from "./App"

export const onRenderHtml: OnRenderHtmlAsync = async (
  pageContext
): ReturnType<OnRenderHtmlAsync> => {
  const pageHtml = renderToString(App, { pageContext })
  return escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <title>${getTitle(pageContext)}</title>
        <meta name="description" content="${getDescription(pageContext)}">
        <meta name="keywords" content="${getKeywords(pageContext).join(", ")}">
        <meta property="og:title" content="Kaioken">
        <meta property="og:description" content="A powerful, easy-to-use rendering library with a tiny footprint">
        <meta property="og:type" content="website">
        <meta property="og:image" content="https://kaioken.dev/kaioken-splash.png" />
        <meta name="darkreader-lock">
      </head>
      <body>
        <div id="page-root">${dangerouslySkipEscape(pageHtml)}</div>
        <div id="portal-root"></div>
      </body>
    </html>`
}
