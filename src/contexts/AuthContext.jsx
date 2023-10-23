import { createContext, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useApp } from "./useApp";
import useRedirect from "@/shared-hooks/useRedirect";
import Cookies from "js-cookie";
import { jwtVerify } from "jose";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
	const { children } = props;
	const { redirectTo } = useRedirect();
	const [state, setState] = useState({
		loading: null,
		data: null,
		operator: null,
		roles: null,
		error: null,
	});

	const validateToken = useCallback(async () => {
		if (state.loading == null) {
			console.debug("restoring authorities...");
			try {
				setState((prev) => ({
					...prev,
					loading: true,
				}));
				// 檢查 cookie
				const token = Cookies.get("token");
				if (!token) {
					toast.error("您尚未登入");
					redirectTo(import.meta.env.VITE_URL_LOGIN);
					return;
				}

				// const decoded = decodeJwt(token);
				// console.debug("decoded", decoded);

				const secret = new TextEncoder().encode(
					import.meta.env.VITE_JWT_SECRET
				);
				const { payload } = await jwtVerify(token, secret);
				console.debug("payload", payload);
				setState((prev) => ({
					...prev,
					operator: payload.entity,
					roles: payload.roles,
				}));
				toast.success(
					`${payload.entity.LoginName || "(帳號)"}/${
						payload.entity.UserName || ""
					} 已成功登入`
				);
			} catch (err) {
				console.error("token restore failed", err);
				toast.error("您的登入已逾期，請重新登入");
				redirectTo(import.meta.env.VITE_URL_LOGIN);
			} finally {
				setState((prev) => ({
					...prev,
					loading: false,
				}));
			}
		}
	}, [redirectTo, state.loading]);

	// const { validateToken } = useApp();

	useEffect(() => {
		validateToken();
	}, [validateToken]);

	return (
		<AuthContext.Provider
			value={{
				...state,
				validateToken,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.element,
};
