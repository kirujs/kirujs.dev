// Mock API with caching simulation
const cache = new Map()

export const fetcher = async (url) => {
  console.log(`📡 Fetching: ${url}`)

  // Simulate network delay
  await new Promise((resolve) =>
    setTimeout(resolve, 500 + Math.random() * 1000)
  )

  // Check cache first (simulate SWR behavior)
  if (cache.has(url)) {
    console.log(`💾 Cache hit: ${url}`)
    return cache.get(url)
  }

  // Mock API responses
  if (url.includes("/posts")) {
    const data = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Post ${i + 1}: Exploring Modern Web Development`,
      body: `This is the body of post ${i + 1}. It contains interesting content about web development, JavaScript frameworks, and best practices.`,
      userId: Math.floor(i / 3) + 1,
    }))
    cache.set(url, data)
    return data
  }

  if (url.includes("/users")) {
    const data = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      username: `user${i + 1}`,
      email: `user${i + 1}@example.com`,
      phone: `555-000${i + 1}`,
      website: `user${i + 1}.dev`,
      company: { name: `Company ${i + 1}` },
    }))
    cache.set(url, data)
    return data
  }

  if (url.includes("/comments")) {
    const data = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      postId: Math.floor(i / 4) + 1,
      name: `Comment ${i + 1}`,
      email: `commenter${i + 1}@example.com`,
      body: `This is comment ${i + 1}. It provides valuable feedback and insights on the post.`,
    }))
    cache.set(url, data)
    return data
  }

  throw new Error(`Unknown endpoint: ${url}`)
}

export { cache }
