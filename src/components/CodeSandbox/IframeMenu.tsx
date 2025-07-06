import { RefreshIcon } from "$/components/icons/RefreshIcon"
import { ElementProps, Signal } from "kaioken"

type IframeMenuProps = ElementProps<"div"> & {
  iframeRef: Kaioken.RefObject<HTMLIFrameElement>
  iframePathname: Signal<string>
}

export function IframeMenu({
  iframeRef,
  iframePathname,
  ...props
}: IframeMenuProps) {
  return (
    <div {...props}>
      <button
        className="text-neutral-400 hover:text-neutral-200"
        onclick={() => {
          if (!iframeRef.current) return
          const url = new URL(iframeRef.current.src)
          url.pathname = iframePathname.value
          iframeRef.current.src = url.toString()
        }}
      >
        <RefreshIcon className="w-4 h-4" />
      </button>
      <div className="text-sm bg-black/50 rounded-md px-2 py-1 w-full text-neutral-400">
        {iframePathname}
      </div>
    </div>
  )
}
