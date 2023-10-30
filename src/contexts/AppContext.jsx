import DateFormats from "@/shared-modules/date-formats";
import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";
import { createContext, useMemo, useState } from "react";
import { useCallback } from "react";
import { decodeJwt, jwtVerify } from "jose";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import useRedirect from "@/shared-hooks/useRedirect";

const AppContext = createContext();

const AppProvider = ({ children }) => {
	// 版本資訊
	const version = useMemo(
		() =>
			format(
				parseISO(import.meta.env.BUILD_TIME),
				DateFormats.DATEFNS_VERSION
			),
		[]
	);

	const [state, setState] = useState({
		data: null,
		// operator: null,
		loading: null,
		error: null,
		token: null,
	});

	// const { redirectTo } = useRedirect();

	const handleTokenChange = useCallback((newToken) => {
		setState((prev) => ({
			...prev,
			token: newToken,
		}));
	}, []);

	const setLoading = useCallback((loading) => {
		setState((prev) => ({
			...prev,
			loading: loading,
		}));
	}, []);

	// const validateToken = async () => {
	// 	if (state.loading == null) {
	// 		console.debug("restoring authorities...");
	// 		try {
	// 			setState((prev) => ({
	// 				...prev,
	// 				loading: true,
	// 			}));
	// 			// 檢查 cookie
	// 			const token = Cookies.get("token");
	// 			if (!token) {
	// 				toast.error("您尚未登入");
	// 				redirectTo(import.meta.env.VITE_URL_LANDING);
	// 				return;
	// 			}

	// 			// const decoded = decodeJwt(token);
	// 			// console.debug("decoded", decoded);

	// 			const secret = new TextEncoder().encode(
	// 				import.meta.env.VITE_JWT_SECRET
	// 			);
	// 			const { payload } = await jwtVerify(token, secret);
	// 			console.debug("payload", payload);
	// 			setState((prev) => ({
	// 				...prev,
	// 				operator: payload.entity,
	// 				roles: payload.roles,
	// 			}));
	// 		} catch (err) {
	// 			console.error("token restore failed", err);
	// 			toast.error("您的登入已逾期，請重新登入");
	// 			redirectTo(import.meta.env.VITE_URL_LANDING);
	// 		} finally {
	// 			setState((prev) => ({
	// 				...prev,
	// 				loading: false,
	// 			}));
	// 		}
	// 	}
	// };

	return (
		<AppContext.Provider
			value={{
				...state,
				fetch,
				version,
				setLoading,
				// validateToken,
				handleTokenChange,
				// REDIRECTS
				// redirectToLanding,
				// redirectToLogin
			}}>
			{children}
		</AppContext.Provider>
	);
};

AppProvider.propTypes = {
	children: PropTypes.node,
};

export { AppContext, AppProvider };
