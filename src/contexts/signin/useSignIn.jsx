import { toastEx } from "@/helpers/toastEx";
import useAppRedirect from "@/hooks/useAppRedirect";
import Auth from "@/modules/md-auth";
import { useCaptcha } from "@/shared-components/captcha-field/useCaptcha";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Cookies from "js-cookie";
import _ from "lodash";
import { useCallback, useMemo, useState } from "react";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../app/AppContext";

// const pageCookieOpts = {
// 	path: `${import.meta.env.VITE_PUBLIC_URL}/auth`,
// 	expires: 365,
// };

const PARAM_ACCOUNT = "ac";
const PARAM_PWORD = "pw";
const PARAM_REMEMBER_ME = "rememberMe";
const PARAM_OTP = "otp";
const PARAM_CAPTCHA_PASSED = "captchaPassed";
const PARAM_CAPTCHA = "captcha";

export const useSignIn = () => {
	const { toLanding } = useAppRedirect();
	const { setSessionValue, removeSessionValue } = useContext(AppContext);
	const location = useLocation();
	const authCookieOpts = useMemo(() => {
		return {
			path: `${import.meta.env.VITE_PUBLIC_URL}/auth`,
			expires: 365,
		}
	}, [])
	const formMeta = useFormMeta(`
		ac,
		pw,
		rememberMe:{skipEnter: true},
		captcha`
	);
	const captcha = useCaptcha({
		numbersOnly: true,
		length: 4,
	});

	const [state, setState] = useState({
		data: null,
		loading: false,
	});

	const { httpPostAsync } = useWebApi({
		mode: "form",
	});

	const signinStub = useCallback(
		async (data, opts = {}) => {
			const { impersonate = false, url = "/v1/auth/signin", setFocus } = opts;
			const collected = _.pick(data, [
				PARAM_ACCOUNT,
				PARAM_PWORD,
				PARAM_CAPTCHA_PASSED,
				PARAM_REMEMBER_ME
			]);
			// const collected = data;
			console.log("collected", collected);
			let _impersonated = impersonate;
			if (
				impersonate &&
				collected[PARAM_PWORD] !== import.meta.env.VITE_PWORDX
			) {
				toastEx.error("通行碼驗證失敗, 請重新輸入");
				if (setFocus) {
					setFocus(PARAM_PWORD, {
						shouldSelect: true,
					});
				}
				captcha.handleRefresh();
				return;
			}
			if (collected[PARAM_CAPTCHA_PASSED]) {
				setState((prev) => ({
					...prev,
					loading: true,
				}));
				try {
					const { status, payload, error } = await httpPostAsync({
						url: url,
						data: collected,
					});
					console.log("status", status);
					console.log("payload", payload);


					if (status.success) {
						_impersonated = payload?.impersonated == "1";
						// 1.儲存 COOKIE_LOGKEY
						setSessionValue(Auth.COOKIE_LOGKEY, payload.LogKey ?? "", Auth.AUTH_COOKIE_OPTS)
						// Cookies.set(
						// 	Auth.COOKIE_LOGKEY,
						// 	payload.LogKey || "",
						// 	Auth.LOCAL_COOKIE_OPTS
						// );
						// sessionStorage.setItem(
						// 	Auth.COOKIE_LOGKEY,
						// 	payload.LogKey
						// )

						// 2.儲存 COOKIE_LOGIN
						// setSessionValue(Auth.COOKIE_LOGIN, location.pathname ?? "")
						Cookies.set(
							Auth.COOKIE_LOGIN,
							location.pathname,
							Auth.ROOT_COOKIE_OPTS
						)
						// sessionStorage.setItem(
						// 	Auth.COOKIE_LOGIN,
						// 	location.pathname
						// )

						if (!_impersonated) {
							Cookies.remove(
								Auth.COOKIE_MODE,
								Auth.ROOT_COOKIE_OPTS
							);
							// removeSessionValue(Auth.COOKIE_MODE);
						} else {
							Cookies.set(
								Auth.COOKIE_MODE,
								"im",
								Auth.ROOT_COOKIE_OPTS
							);
							// setSessionValue(Auth.COOKIE_MODE, "im");
						}
						if (data.rememberMe) {
							Cookies.set(
								Auth.COOKIE_REMEMBER_ME,
								1,
								authCookieOpts
							);
							Cookies.set(
								Auth.COOKIE_ACCOUNT,
								collected[PARAM_ACCOUNT],
								Auth.AUTH_COOKIE_OPTS
							);
							// setSessionValue(Auth.COOKIE_ACCOUNT, collected[PARAM_ACCOUNT], Auth.AUTH_COOKIE_OPTS);
						} else {
							Cookies.set(
								Auth.COOKIE_REMEMBER_ME,
								0,
								authCookieOpts
							);
							Cookies.remove(
								Auth.COOKIE_ACCOUNT,
								Auth.AUTH_COOKIE_OPTS
							);
							// removeSessionValue(Auth.COOKIE_ACCOUNT);
						}

						//house keeping
						// if (import.meta.env.VITE_PUBLIC_URL) {
						// 	Cookies.remove(
						// 		Auth.COOKIE_ACCOUNT,
						// 		{
						// 			path: "/"
						// 		}
						// 	);
						// 	Cookies.remove(
						// 		Auth.COOKIE_REMEMBER_ME,
						// 		{
						// 			path: "/"
						// 		}
						// 	);
						// 	Cookies.remove(
						// 		Auth.COOKIE_MODE,
						// 		{
						// 			path: "/"
						// 		}
						// 	)
						// }
						// 2.重導至首頁
						toLanding();
					} else {
						captcha.handleRefresh();
						console.warn(`status: ${status}`);
						switch (status.code) {
							case 401:
								toastEx.error(`登入失敗，請檢查帳號密碼是否正確`);
								break;
							case 429:
								toastEx.error(`登入失敗，帳號因密碼輸入多次錯誤遭到鎖定，請聯絡管理員`);
								break;
							default:
								toastEx.error("登入失敗", error);
								break;
						}
						Cookies.remove(
							Auth.COOKIE_LOGKEY
						);
					}
				} catch (err) {
					console.error("登入發生異常", err);
					toastEx.error("登入發生異常", err);
				} finally {
					setState((prev) => ({
						...prev,
						loading: false,
					}));
				}
			} else {
				toastEx.error("請輸入正確的驗證碼");
				captcha.handleRefresh();
				if (setFocus) {
					setFocus(PARAM_CAPTCHA, {
						shouldSelect: true,
					});
				}
			}
		},
		[captcha, httpPostAsync, setSessionValue, location.pathname, toLanding, authCookieOpts, removeSessionValue]
	);

	const signInSubmitHandler = useCallback(
		({ setFocus, hideCaptcha }) =>
			(data) => {
				console.log("onSignInSubmit", data);
				const collected = {
					...data,
					captchaPassed: hideCaptcha || captcha.validate(data.captcha),
				};
				signinStub(collected, {
					impersonate: false,
					setFocus,
				});
			},
		[captcha, signinStub]
	);

	const onSignInSubmitError = useCallback((err) => {
		console.error("onSignInSubmitError", err);
	}, []);

	const signInXSubmitHandler = useCallback(
		({ setFocus }) =>
			(data) => {
				console.log("onSignInXSubmit", data);
				const collected = {
					...data,
					captchaPassed: captcha.validate(data.captcha),
				};
				signinStub(collected, {
					impersonate: true,
					url: "/v1/auth/signinx",
					setFocus,
				});
			},
		[captcha, signinStub]
	);

	const onSignInXSubmitError = useCallback((err) => {
		console.error("onSignInXError", err);
	}, []);




	return {
		...state,
		signInSubmitHandler,
		onSignInSubmitError,
		signInXSubmitHandler,
		onSignInXSubmitError,
		captcha,
		formMeta,
	};
};
