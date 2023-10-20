import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	// eslint-disable-next-line no-undef
	const env = loadEnv(mode, process.cwd(), "");
	console.debug(`PROFILE: ${env.VITE_PROFILE}`);

	return {
		base: env.VITE_PUBLIC_URL,
		server: {
			proxy: {
				"/api": {
					target: "http://127.0.0.1:5229",
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
		},
		plugins: [react()],
		resolve: {
			alias: {
				"@": "/src",
			},
		},
		define: {
			"import.meta.env.BUILD_TIME": new Date(),
		},

		// ...(env.VITE_PROFILE === "dev" && {
		// 	server: {
		// 		proxy: {
		// 			// "/api": "http://ap01/WebSale/api",
		// 			"/api": {
		// 				target: "http://ap01/WebSale/api",
		// 				changeOrigin: true,
		// 				secure: false,
		// 			},
		// 		},
		// 	},
		// }),
	};
});
