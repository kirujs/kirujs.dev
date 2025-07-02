// Mock API functions
export const fetchUser = async (id) => {
  await new Promise((resolve) =>
    setTimeout(resolve, 1000 + Math.random() * 1000)
  )

  if (id === "404") {
    throw new Error("User not found")
  }

  return {
    id,
    name: `User ${id}`,
    email: `user${id}@example.com`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
    bio: `I'm user number ${id}. I love using Kaioken for building reactive UIs!`,
    posts: Math.floor(Math.random() * 100) + 1,
    followers: Math.floor(Math.random() * 1000) + 10,
    following: Math.floor(Math.random() * 500) + 5,
  }
}

export const fetchPosts = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 500))

  return Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    title: `Post ${i + 1} by User ${userId}`,
    content: `This is the content of post ${i + 1}. It's a fascinating read about ${
      ["Kaioken", "JavaScript", "Web Development", "UI/UX", "Programming"][i]
    }.`,
    likes: Math.floor(Math.random() * 50) + 1,
    comments: Math.floor(Math.random() * 20) + 1,
    createdAt: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
  }))
}
