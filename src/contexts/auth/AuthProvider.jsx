import useAppRedirect from "@/hooks/useAppRedirect";
import Messages from "@/modules/md-messages";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { decodeJwt, jwtVerify } from "jose";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

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
	});

	const [authoritiesState, setAuthoritiesState] = useState({
		authorities: null,
		authoritiesError: null,
		authoritiesLoading: null,
	});

	const loadAuthorities = useCallback(
		async (token) => {
			console.debug("loading authorities...");
			setAuthoritiesState((prev) => ({
				...prev,
				authoritiesLoading: true,
			}));
			try {
				const { status, payload } = await httpGetAsync({
					url: "v1/auth/authorities",
					bearer: token,
				});
				if (status.success) {
					setAuthoritiesState((prev) => ({
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
				setAuthoritiesState((prev) => ({
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
				const { status, payload, error } = await httpGetAsync({
					url: "v1/auth/token",
				});

				if (!status.success) {
					// toast.error("登入發生例外");
					// redirectToLogin();
					// return;
					throw error;
				}

				// JOSE methods
				// ** 1 ** → no validation
				const token = payload.token;
				const jwtPayload = decodeJwt(token);
				console.debug("jwtPayload", jwtPayload);

				const expDate = new Date(jwtPayload.exp * 1000);

				// 檢查令牌是否已過期
				if (Date.now() > expDate) {
					console.log("token expired");
				} else {
					console.log("token is valid");
				}

				// ** 2 ** → requires https
				// const secret = new TextEncoder().encode(
				// 	import.meta.env.VITE_JWT_SECRET
				// );
				// const { payload: jwtPayload } = await jwtVerify(token, secret);

				// ** 3 **
				// const secret = jose.base64url.decode(
				// 	"zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI"
				// );
				// const { payload: jwtPayload } = await jose.jwtDecrypt(
				// 	token,
				// 	secret
				// );
				// console.debug("jwtPayload", jwtPayload);

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
				switch (err.status) {
					case 401:
						toast.error("您的登入已逾期，請重新登入");
						break;
					default:
						toast.error("登入發生例外，請重新登入");
						break;
				}
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
				...authoritiesState,
				validateToken,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.element,
};
