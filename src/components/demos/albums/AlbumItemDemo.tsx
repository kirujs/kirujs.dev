import { siteCodeLang } from "$/state/siteCodeLang"
import { CodeDemo } from "../CodeDemo"
import { DemoComponentWrapper } from "../DemoComponentWrapper"
import { AlbumItem } from "./AlbumItem"
import AlbumItemCodeBlock from "./AlbumItem.md"
import AlbumItemCodeBlockTS from "./AlbumItem.ts.md"

export function AlbumItemDemo() {
  return (
    <CodeDemo
      filename={siteCodeLang.value === "js" ? "Album.jsx" : "Album.tsx"}
      CodeBlock={
        siteCodeLang.value === "js" ? AlbumItemCodeBlock : AlbumItemCodeBlockTS
      }
    >
      <DemoComponentWrapper className="max-w-[340px]">
        <AlbumItem
          album={{
            id: "1",
            title: "Album title",
            artist: "Artist",
            url: "#",
          }}
        />
      </DemoComponentWrapper>
    </CodeDemo>
  )
}
