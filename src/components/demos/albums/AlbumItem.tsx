import { LikeButton } from "$/components/LikeButton"
import { PlayIcon } from "$/components/icons/PlayIcon"
import { useState } from "kaioken"

export function AlbumItem({ album }: { album: Album }) {
  const [liked, setLiked] = useState(false)
  return (
    <div className="flex items-center gap-4">
      <div role="none" className="p-2 border-2 border-light rounded-sm">
        <PlayIcon />
      </div>
      <div className="grow">
        <h4 className="font-bold">{album.title}</h4>
        <span className="text-muted">{album.artist}</span>
      </div>
      <LikeButton liked={liked} toggleLiked={() => setLiked((prev) => !prev)} />
    </div>
  )
}
