import type { FilesMap } from "@codesandbox/nodebox"

const PACKAGE_JSON = JSON.stringify({
  name: "kaioken-vite-custom-sandbox",
  type: "module",
  scripts: {
    dev: "vite",
  },
  dependencies: {
    kaioken: ">=0.38.0",
    "esbuild-wasm": "latest",
    "@rollup/wasm-node": "latest",
  },
  devDependencies: {
    //typescript: "5.5.3",
    vite: "4.5.5",
    "vite-plugin-kaioken": "latest",
  },
  npm: {
    overrides: {
      rollup: "npm:@rollup/wasm-node",
    },
  },
})
// const TS_CONFIG = JSON.stringify({
//   compilerOptions: {
//     target: "ES2020",
//     useDefineForClassFields: true,
//     module: "ESNext",
//     lib: ["ES2020", "DOM", "DOM.Iterable"],
//     skipLibCheck: true,

//     /* Bundler mode */
//     moduleResolution: "bundler",
//     allowImportingTsExtensions: true,
//     resolveJsonModule: true,
//     isolatedModules: true,
//     noEmit: true,

//     /* Linting */
//     strict: true,
//     noUnusedLocals: true,
//     noUnusedParameters: true,
//     noFallthroughCasesInSwitch: true,

//     jsx: "preserve",
//   },
//   include: ["src"],
// })
const VITE_SERVER_SCRIPT = `
import { createServer } from 'vite';
import kaioken from 'vite-plugin-kaioken';
async function startViteServer() {
  try {
    // Create a Vite dev server
    const server = await createServer({
      // Optional: Define Vite-specific options here if needed
      // This is similar to the vite.config.js configuration
      server: {
        port: 3000,  // Customize the port if desired
      },
      
      plugins: [kaioken({devtools:false})],
    });

    // Start the server
    await server.listen();
      
    // Print out the URL to visit the app
    console.log(\`Vite server is running at: http://localhost:\${server.config.server.port}\`);
  } catch (err) {
    console.error('Error starting Vite server:', err);
  }
}

startViteServer();
`
const INDEX_HTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + TS + Kaioken</title>
  </head>
  <body style="background-color: #1c1a1a" >
    <div id="app"></div>
    <script type="module" src="/src/client.ts"></script>
  </body>
</html>
`
const STYLES = `
:root {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
					'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #1c1a1a;
  color: #f6f6f6;
}
body {
  margin: 0;
}
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 1rem;
}
#error-display {
  color: crimson;
  background-color: #111;
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  font-size: 1rem;
  border: 1px solid #f66;
  padding: .5rem;
  width: calc(100% - 3rem);
  display: block;
}
`
const CLIENT_TS = `
import "./styles.css"
import { mount } from "kaioken"
import { App } from "./App"
const root = document.getElementById("app")!
mount(App, root);

const errorDisplay = Object.assign(document.createElement("div"), {
  id: "error-display",
});

window.__kaioken.on("update", () => {
  if (errorDisplay.isConnected) {
    errorDisplay.innerHTML = "";
    errorDisplay.remove();
  }
});

window.addEventListener("error", (err) => {
  errorDisplay.innerHTML += ("message" in err ? err.message : err) + "\\n";
  if (!errorDisplay.isConnected) {
    document.body.appendChild(errorDisplay);
  }
})
`

export const FILES_MAP: FilesMap = {
  "package.json": PACKAGE_JSON,
  //"/tsconfig.json": TS_CONFIG,
  "startVite.js": VITE_SERVER_SCRIPT,
  "/index.html": INDEX_HTML,
  "/src/styles.css": STYLES,
  "/src/client.ts": CLIENT_TS,
}
