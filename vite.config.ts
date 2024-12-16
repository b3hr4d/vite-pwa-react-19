import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";
import { pwaConfiguration } from "./vite.pwa.config";

import { version } from "./package.json";

export default defineConfig({
	css: {
		postcss: {
			plugins: [tailwindcss, autoprefixer],
		},
	},
	define: {
		"process.env": {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			PUBLIC_VERSION: JSON.stringify(version),
		},
	},
	plugins: [reactRouter(), tsconfigPaths(), VitePWA(pwaConfiguration)],
});
