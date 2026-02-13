import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";
import fs from "fs";
import path from "path";
import { format } from "date-fns";
import { buildResultPlugin } from "shared-modules/plugins";

const DATEFNS_VERSION_FORMAT = "yyMMdd.HHmm";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	// eslint-disable-next-line no-undef
	const env = loadEnv(mode, process.cwd(), "");
	const buildTime = new Date();
	console.log(`PROFILE: ${env.VITE_PROFILE}`);
	const version = format(buildTime, DATEFNS_VERSION_FORMAT);
	// 定義一個變數來儲存 resolvedConfig
	let resolvedConfig;

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
		define: {
			"import.meta.env.BUILD_TIME": JSON.stringify(
				buildTime.toISOString(),
			),
			__BUILD_TIME__: JSON.stringify(buildTime.toISOString()),
		},
		plugins: [
			react(),
			// visualizer({
			// 	open: true, // 自動打開瀏覽器顯示分析圖表
			// 	filename: "stats.html", // 輸出檔案
			// }),
			VitePWA({
				registerType: "prompt",
				// registerType: "autoUpdate",
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
					cleanupOutdatedCaches: true,
					skipWaiting: true, // 強制新的 SW 進入 active 狀態
					clientsClaim: true, // 讓新的 SW 立即取得頁面控制權
				},
				// #for dev - 在開發模式下也啟用 SW
				// devOptions: {
				// 	enabled: true,
				// 	type: "module",
				// },
			}),
			buildResultPlugin({ buildTime }),
			// {
			// 	name: "generate-build-result",
			// 	configResolved(config) {
			// 		// 記住 Vite 最終決定的 outDir (可能是 CLI 傳入的，也可能是預設的)
			// 		resolvedConfig = config;
			// 	},
			// 	closeBundle() {
			// 		const outDir = resolvedConfig.build.outDir || "dist";
			// 		const filePath = path.resolve(
			// 			process.cwd(),
			// 			outDir,
			// 			"build-result.json",
			// 		);
			// 		const content = { version: version };
			// 		// 確保目錄存在（預防萬一）
			// 		if (!fs.existsSync(path.dirname(filePath))) {
			// 			fs.mkdirSync(path.dirname(filePath), {
			// 				recursive: true,
			// 			});
			// 		}
			// 		fs.writeFileSync(
			// 			filePath,
			// 			JSON.stringify(content, null, 2),
			// 		);
			// 		console.log(`\n✅ Build result saved to ${filePath}`);
			// 	},
			// },
		],
		resolve: {
			alias: {
				"@": "/src",
			},
		},

		build: {
			chunkSizeWarningLimit: 5000, // 設定為 5000 kB
			rollupOptions: {
				input: {
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
			// sourcemap: env.VITE_PROFILE !== "jota",
		},
	};
});
