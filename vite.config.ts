import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode (e.g., development or production)
  const env = loadEnv(mode, process.cwd());

  console.log("Loaded environment variables:", env);

  return {
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
    plugins: [reactRouter(), tsconfigPaths()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL.replace('/api', ''), // Strip `/api` for proper proxying
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
