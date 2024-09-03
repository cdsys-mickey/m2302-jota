import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

import Auth from "@/modules/md-auth";

const CheckAuthRoute = () => {
	const logKey = Cookies.get(Auth.COOKIE_LOGKEY);

	if (logKey) {
		return <Navigate to={import.meta.env.VITE_URL_LANDING} replace />;
	} else {
		const impersonte = Cookies.get(Auth.COOKIE_MODE) === "im";
		if (impersonte) {
			return <Navigate to={import.meta.env.VITE_URL_LOGINX} replace />;
		}
		return <Navigate to={import.meta.env.VITE_URL_LOGIN} replace />;
	}
};

CheckAuthRoute.propTypes = {};

CheckAuthRoute.displayName = "CheckAuthRoute";
export default CheckAuthRoute;
