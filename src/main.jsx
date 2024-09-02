import ReactDOM from "react-dom/client";
// import "react-datasheet-grid/dist/style.css";
import App from "./App.jsx";

import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./pages/ErrorPage.jsx";

// import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<Router basename={import.meta.env.VITE_PUBLIC_URL}>
		{import.meta.env.VITE_PROFILE === "prod" ?
			(<ErrorBoundary FallbackComponent={ErrorPage}>
				<App />
			</ErrorBoundary>)
			: (<App />)}
	</Router>
	// </React.StrictMode>
);
