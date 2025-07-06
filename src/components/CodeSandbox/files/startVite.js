import { createServer } from "vite"
import kaioken from "vite-plugin-kaioken"

async function startViteServer() {
  try {
    console.log("Starting Vite server...")
    // Create a Vite dev server
    const server = await createServer({
      // Optional: Define Vite-specific options here if needed
      // This is similar to the vite.config.js configuration
      server: {
        port: 8080, // Customize the port if desired
      },

      plugins: [kaioken({ devtools: false })],
    })

    // Start the server
    await server.listen()

    // Print out the URL to visit the app
    console.log(
      `Vite server is running at: http://localhost:${server.config.server.port}`
    )
  } catch (err) {
    console.error("Error starting Vite server:", err)
  }
}

startViteServer()
