import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import solidSvg from "vite-plugin-solid-svg";

export default defineConfig({
  plugins: [
    solidPlugin(),
    solidSvg({
      defaultExport: "component",
    }),
  ],
  resolve: {
    alias: [
      {
        "~/": path.resolve(__dirname, "./imports/ui/"),
      },
    ],
  },
  meteor: {
    clientEntry: "imports/ui/main.tsx",
  },
});
