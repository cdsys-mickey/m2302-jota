import { Navigate } from "react-router-dom";

import Auth from "@/modules/Auth.mjs";
import { useContext } from "react";
import { AppContext } from "@/contexts/app/AppContext";

const CheckAuthRoute = () => {
	// const logKey = Cookies.get(Auth.COOKIE_LOGKEY);
	const app = useContext(AppContext);
	const logKey = app.getSessionCookie(Auth.COOKIE_LOGKEY);

	if (logKey) {
		return <Navigate to={import.meta.env.VITE_URL_LANDING} replace />;
	} else {
		const impersonte = sessionStorage.getItem(Auth.COOKIE_IMPERSONATE) == 1;
		if (impersonte) {
			return <Navigate to={import.meta.env.VITE_URL_LOGINX} replace />;
		}
		return <Navigate to={import.meta.env.VITE_URL_LOGIN} replace />;
	}
};

CheckAuthRoute.propTypes = {};

CheckAuthRoute.displayName = "CheckAuthRoute";
export default CheckAuthRoute;
