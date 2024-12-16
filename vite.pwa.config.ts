import type { VitePWAOptions } from "vite-plugin-pwa";

export const pwaConfiguration: Partial<VitePWAOptions> = {
	registerType: "prompt",
	injectRegister: "auto",
	manifest: {
		name: "EscrowWallet",
		short_name: "EscrowWallet",
		theme_color: "#ffffff",
		background_color: "#ffffff",
		display: "standalone",
		icons: [
			{
				src: "/assets/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/assets/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	},
	devOptions: {
		enabled: true,
		type: "module",
		navigateFallback: "index.html",
	},
	workbox: {
		cleanupOutdatedCaches: true,
		skipWaiting: false,
		clientsClaim: false,
		sourcemap: true,
		globIgnores: [
			"**/node_modules/**/*",
			"**/dist/**/*",
			"**/out/**/*",
			"**/dev-dist/*",
		],
	},
};
