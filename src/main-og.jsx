import ReactDOM from "react-dom/client";
// import "react-datasheet-grid/dist/style.css";
import App from "./App.jsx";

import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./pages/ErrorPage.jsx";

// 只有 prod 時才移除 log
if (!["dev"].includes(import.meta.env.VITE_PROFILE)) {
	console.log = function () { };
}

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<Router basename={import.meta.env.VITE_PUBLIC_URL}>
		{import.meta.env.VITE_PROFILE !== "dev" ?
			(<ErrorBoundary FallbackComponent={ErrorPage}>
				<App />
			</ErrorBoundary>)
			: (<App />)}
	</Router>
	// </React.StrictMode>
);
