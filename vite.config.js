import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	// eslint-disable-next-line no-undef
	const env = loadEnv(mode, process.cwd(), "");
	console.log(`PROFILE: ${env.VITE_PROFILE}`);

	return {
		base: env.VITE_PUBLIC_URL,
		// 只有影響開發環境
		server: {
			proxy: {
				"/api": {
					target: "http://127.0.0.1:5229",
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
				"/hub": {
					target: "http://127.0.0.1:5229",
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/hub/, ""),
				},
			},
		},
		plugins: [
			react(),
			// visualizer({
			// 	open: true, // 自動打開瀏覽器顯示分析圖表
			// 	filename: "stats.html", // 輸出檔案
			// }),
			VitePWA({
				registerType: "autoUpdate",
				manifest: {
					name: "JOTA 進銷存",
					short_name: "JOTA",
					description: "宗泰食品集團進銷存系統",
					lang: "zh-TW",
					// start_url: "/jota",
					display: "standalone",
					background_color: "#ffffff",
					theme_color: "#e0e0e0",
					icons: [
						{
							src: "logo512.png",
							sizes: "512x512",
							type: "image/png",
							purpose: "any maskable",
						},
						{
							src: "logo192.png",
							sizes: "192x192",
							type: "image/png",
						},
					],
				},
				workbox: {
					maximumFileSizeToCacheInBytes: 5000000, // 5 MB
				},
			}),
		],
		resolve: {
			alias: {
				"@": "/src",
			},
		},
		define: {
			"import.meta.env.BUILD_TIME": new Date(),
		},
		build: {
			chunkSizeWarningLimit: 5000, // 設定為 5000 kB
			rollupOptions: {
				input: {
					// 指定你的入口文件
					main: "./index.html",
				},
				output: {
					// 排除 config.json
					manualChunks(id) {
						if (id.includes("public/config.json")) {
							return false; // 排除這個文件
						}
					},
				},
			},
		},
	};
});
