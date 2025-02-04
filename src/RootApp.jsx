import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ConfigProvider from "./contexts/config/ConfigProvider";
import ErrorPage from "./pages/ErrorPage";
import LoadingTypography from "./shared-components/LoadingTypography";

const loadConfig = async () => {
	try {
		const response = await fetch(`${import.meta.env.VITE_PUBLIC_URL}/config.json`);
		const config = await response.json();
		return config;
	} catch (error) {
		console.error("Failed to load config.json", error);
		return {};
	}
};

function RootApp() {
	const [config, setConfig] = useState(null);

	useEffect(() => {
		loadConfig().then(setConfig);
	}, []);

	if (!config) {
		return <LoadingTypography>啟動中...</LoadingTypography>; // 避免 config 尚未載入就渲染 App
	}

	console.log("config", config);

	// 只有 prod 時才移除 log
	if (config.PROFILE !== "dev") {
		console.log = function () { };
	}

	return (
		<ConfigProvider {...config}>
			<BrowserRouter basename={`${import.meta.env.VITE_PUBLIC_URL}/`}>
				{config.PROFILE !== "dev" ? (
					<ErrorBoundary FallbackComponent={ErrorPage}>
						<App />
					</ErrorBoundary>
				) : (
					<App />
				)}
			</BrowserRouter >
		</ConfigProvider>
	);
}

export default RootApp;