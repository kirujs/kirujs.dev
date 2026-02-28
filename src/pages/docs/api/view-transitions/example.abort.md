```jsx
import { signal, ViewTransitions } from "kiru"

function ImageGallery({ images }) {
  const current = signal(images[0])
  let controller = new AbortController()

  const navigate = (next) => {
    controller.abort()
    controller = new AbortController()

    ViewTransitions.run(() => {
      current.value = next
    }, { signal: controller.signal })
  }

  return () => (
    <div>
      <img src={current.value.src} alt={current.value.alt} />
      <div>
        {images.map((img) => (
          <button onclick={() => navigate(img)}>{img.alt}</button>
        ))}
      </div>
    </div>
  )
}
```
