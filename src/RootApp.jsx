import { useContext } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { ConfigContext } from "shared-components/config";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";


function RootApp() {
	const config = useContext(ConfigContext);

	// 只有 prod 時才移除 log
	if (config.PROFILE !== "dev") {
		console.log = function () { };
	}

	return (
		<BrowserRouter basename={`${import.meta.env.VITE_PUBLIC_URL}/`}>
			{config.PROFILE !== "dev" ? (
				<ErrorBoundary FallbackComponent={ErrorPage}>
					<App />
				</ErrorBoundary>
			) : (
				<App />
			)}
		</BrowserRouter >
	);
}

export default RootApp;