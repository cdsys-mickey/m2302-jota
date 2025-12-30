import ReactDOM from "react-dom/client";
import RootApp from "./RootApp.jsx";
import { ConfigProvider } from "shared-components/config";

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<ConfigProvider
		appId={
			import.meta.env.VITE_PROFILE !== "dev"
				? import.meta.env.VITE_APP_ID
				: ""
		}
	>
		<RootApp />
	</ConfigProvider>
	// </React.StrictMode>
);
