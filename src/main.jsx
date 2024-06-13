import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "react-datasheet-grid/dist/style.css";

import { BrowserRouter as Router } from "react-router-dom";

// import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<Router basename={import.meta.env.VITE_PUBLIC_URL}>
		<App />
	</Router>
	// </React.StrictMode>
);
