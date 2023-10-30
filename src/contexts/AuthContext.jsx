import { useWebApi } from "@/shared-hooks/useWebApi";
import { jwtVerify } from "jose";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAppRedirect from "@/hooks/useAppRedirect";
import Messages from "@/modules/md-messages";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
	const { children } = props;
	const { redirectToLogin } = useAppRedirect();
	const { httpGetAsync } = useWebApi();
	const [state, setState] = useState({
		// AUTHENTICATE
		validating: null,
		operator: null,
		token: null,
		roles: null,
		error: null,
		// AUTHORITIES
		authorities: null,
		authoritiesError: null,
		authoritiesLoading: null,
	});

	const loadAuthorities = useCallback(
		async (token) => {
			console.debug("loading authorities...");
			setState((prev) => ({
				...prev,
				authoritiesLoading: true,
			}));
			try {
				const { status, payload } = await httpGetAsync({
					url: "v1/auth/authorities",
					bearer: token,
				});
				if (status.success) {
					setState((prev) => ({
						...prev,
						authorities: payload,
						authoritiesLoading: false,
					}));
				} else {
					switch (status.code) {
						case 401:
							toast.warn(Messages.SESSION_EXPIRED);
							redirectToLogin();
					}
				}
			} catch (err) {
				console.error("loadAuthorities", err);
				setState((prev) => ({
					...prev,
					authoritiesLoading: false,
				}));
			}
		},
		[httpGetAsync, redirectToLogin]
	);

	const validateToken = useCallback(async () => {
		if (state.validating == null) {
			console.debug(`validating token...`);
			try {
				setState((prev) => ({
					...prev,
					validating: true,
				}));
				// 檢查 cookie
				// const token = Cookies.get("token");
				// if (!token) {
				// 	toast.error("您尚未登入");
				// 	redirectTo(import.meta.env.VITE_URL_LOGIN);
				// 	return;
				// }
				const logKey = Cookies.get("LogKey");
				if (!logKey) {
					toast.error("您尚未登入");
					redirectToLogin();
					return;
				}
				const { status, payload } = await httpGetAsync({
					url: "v1/auth/token",
				});

				if (!status.success) {
					toast.error("登入發生例外");
					redirectToLogin();
					return;
				}

				const token = payload.token;
				// const decoded = decodeJwt(token);
				// console.debug("decoded", decoded);

				const secret = new TextEncoder().encode(
					import.meta.env.VITE_JWT_SECRET
				);
				const { payload: jwtPayload } = await jwtVerify(token, secret);
				console.debug("jwtPayload", jwtPayload);
				setState((prev) => ({
					...prev,
					token,
					operator: jwtPayload.entity,
					roles: jwtPayload.roles,
				}));
				toast.success(
					`${jwtPayload.entity.LoginName || "(帳號)"}/${
						jwtPayload.entity.UserName || ""
					} 已成功登入`
				);

				loadAuthorities(token);
			} catch (err) {
				console.error("token restore failed", err);
				toast.error("您的登入已逾期，請重新登入");
				redirectToLogin();
			} finally {
				setState((prev) => ({
					...prev,
					validating: false,
				}));
			}
		}
	}, [httpGetAsync, loadAuthorities, redirectToLogin, state.validating]);

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
