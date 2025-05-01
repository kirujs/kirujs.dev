import { SearchIcon } from "$/components/icons/SearchIcon"
import { createStore, useMemo, useModel } from "kaioken"
import { CodeDemo } from "../CodeDemo"
import { DemoComponentWrapper } from "../DemoComponentWrapper"
import { PlayIcon } from "$/components/icons/PlayIcon"
import { LikeButton } from "$/components/LikeButton"
import { siteCodeLang } from "$/state/siteCodeLang"
import SearchableAlbumList from "./SearchableAlbumList.mdx"
import SearchableAlbumListTS from "./SearchableAlbumList.ts.mdx"

const useAlbumsStore = createStore(
  [
    {
      id: "a030bbdc-0d65-4639-be10-b1eb05ee9bb0",
      title: "First album",
      artist: "Album artist",
      url: "#",
      liked: false,
    },
    {
      id: "a030bbdc-0d65-4639-be10-b1eb05ee9bb1",
      title: "Second album",
      artist: "Album artist",
      url: "#",
      liked: false,
    },
    {
      id: "a030bbdc-0d65-4639-be10-b1eb05ee9bb2",
      title: "Third album",
      artist: "Album artist",
      url: "#",
      liked: false,
    },
    {
      id: "a030bbdc-0d65-4639-be10-b1eb05ee9bb3",
      title: "Fourth album",
      artist: "Album artist",
      url: "#",
      liked: false,
    },
    {
      id: "a030bbdc-0d65-4639-be10-b1eb05ee9bb4",
      title: "Fifth album",
      artist: "Album artist",
      url: "#",
      liked: false,
    },
  ] as (Album & { liked: boolean })[],
  (set) => ({
    setAlbumLiked: (id: string, liked: boolean) =>
      set((prev) => prev.map((a) => (a.id === id ? { ...a, liked } : a))),
  })
)

export function AlbumSearchDemo() {
  const [inputRef, inputValue] = useModel<HTMLInputElement>("")
  const { value: albums } = useAlbumsStore(
    (store) => store,
    () => true
  )

  const [filteredAlbums, resultTxt] = useMemo(() => {
    const res = albums.filter(
      (a) => a.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    )
    const len = res.length
    return [
      res,
      len === 0
        ? `No matches for "${inputValue}"`
        : len === 1
          ? "1 match"
          : `${len} matches`,
    ]
  }, [inputValue])

  return (
    <CodeDemo
      filename={
        siteCodeLang.value === "js"
          ? "SearchableAlbumList.jsx"
          : "SearchableAlbumList.tsx"
      }
      // @ts-ignore
      CodeBlock={
        siteCodeLang.value === "js"
          ? SearchableAlbumList
          : SearchableAlbumListTS
      }
    >
      <DemoComponentWrapper className="max-w-[340px] overflow-hidden p-0">
        <div className="h-[240px] overflow-auto p-4">
          <h2 className="mb-4 font-bold text-lg">Albums</h2>
          <div className="sticky top-0 bg-stone-750 mb-4 flex rounded-sm z-10 shadow-md shadow-stone-900">
            <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              ref={inputRef}
              type="text"
              name="album-search"
              className="bg-transparent pl-8 w-full text-sm py-1"
              placeholder="Search"
            />
          </div>
          <section className="flex flex-col gap-4">
            <p className="text-muted">{resultTxt}</p>
            {filteredAlbums.map((album) => (
              <AlbumItem key={album.id} album={album} />
            ))}
          </section>
        </div>
      </DemoComponentWrapper>
    </CodeDemo>
  )
}

function AlbumItem({ album }: { album: Album; key: string }) {
  const { value: liked, setAlbumLiked } = useAlbumsStore(
    (store) => store.find((a) => a.id === album.id)!.liked
  )
  return (
    <div className="flex items-center gap-4">
      <div role="none" className="p-2 border-2 border-light rounded-sm">
        <PlayIcon />
      </div>
      <div className="grow">
        <h4 className="font-bold">{album.title}</h4>
        <span className="text-muted">{album.artist}</span>
      </div>
      <LikeButton
        liked={liked}
        toggleLiked={() => setAlbumLiked(album.id, !liked)}
      />
    </div>
  )
}
