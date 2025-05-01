import { siteCodeLang } from "$/state/siteCodeLang"
import { CodeDemo } from "../CodeDemo"
import { DemoComponentWrapper } from "../DemoComponentWrapper"
import { AlbumItem } from "./AlbumItem"
import AlbumList from "./AlbumList.md"
import AlbumListTS from "./AlbumList.ts.md"

export function AlbumListDemo() {
  const albums: Album[] = [
    {
      id: "1",
      title: "First album",
      artist: "Album artist",
      url: "#",
    },
    {
      id: "2",
      title: "Second album",
      artist: "Album artist",
      url: "#",
    },
    {
      id: "3",
      title: "Third album",
      artist: "Album artist",
      url: "#",
    },
  ]

  return (
    <CodeDemo
      filename={siteCodeLang.value === "js" ? "AlbumList.jsx" : "AlbumList.tsx"}
      CodeBlock={siteCodeLang.value === "js" ? AlbumList : AlbumListTS}
    >
      <DemoComponentWrapper className="max-w-[340px]">
        <h2 className="mb-4 font-bold text-lg">3 albums</h2>
        <section className="flex flex-col gap-4">
          {albums.map((album) => (
            <AlbumItem key={album.id} album={album} />
          ))}
        </section>
      </DemoComponentWrapper>
    </CodeDemo>
  )
}
