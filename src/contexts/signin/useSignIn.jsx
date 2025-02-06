import { toastEx } from "@/helpers/toast-ex";
import useAppRedirect from "@/hooks/useAppRedirect";
import Auth from "@/modules/md-auth";
import { useCaptcha } from "@/shared-components/captcha-field/useCaptcha";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Cookies from "js-cookie";
import _ from "lodash";
import { useCallback, useMemo, useState } from "react";
import { useFormMeta } from "../../shared-contexts/form-meta/useFormMeta";

// const pageCookieOpts = {
// 	path: `${import.meta.env.VITE_PUBLIC_URL}/auth`,
// 	expires: 365,
// };

const PARAM_ACCOUNT = "ac";
const PARAM_PWORD = "pw";
const PARAM_CAPTCHA = "captcha";

export const useSignIn = () => {
	const { toLanding } = useAppRedirect();
	// const config = useContext(ConfigContext);
	const pageCookieOpts = useMemo(() => {
		return {
			path: `${import.meta.env.VITE_PUBLIC_URL}/auth`,
			// path: `${config.PUBLIC_URL}/auth`,
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
			const { impersonate = false, setFocus } = opts;
			const collected = _.pick(data, [
				PARAM_ACCOUNT,
				PARAM_PWORD,
				"captchaPassed",
			]);

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
			if (collected.captchaPassed) {
				setState((prev) => ({
					...prev,
					loading: true,
				}));
				try {
					const { status, payload, error } = await httpPostAsync({
						url: impersonate
							? "/v1/auth/signinx"
							: "/v1/auth/signin",
						data: collected,
					});
					console.log("status", status);
					console.log("payload", payload);
					if (error) {
						console.error(error);
					}

					if (status.success) {
						// 1.儲存 Cookie
						Cookies.set(
							Auth.COOKIE_LOGKEY,
							payload.LogKey || "",
							Auth.COOKIE_OPTS
						);
						// 2.儲存 session
						sessionStorage.setItem(
							Auth.COOKIE_LOGKEY,
							payload.LogKey
						)
						if (!impersonate) {
							Cookies.remove(Auth.COOKIE_MODE);
						} else {
							Cookies.set(
								Auth.COOKIE_MODE,
								"im",
								Auth.COOKIE_OPTS
							);
						}
						if (data.rememberMe) {
							Cookies.set(
								Auth.COOKIE_REMEMBER_ME,
								1,
								pageCookieOpts
							);
							Cookies.set(
								Auth.COOKIE_ACCOUNT,
								collected[PARAM_ACCOUNT],
								Auth.COOKIE_OPTS
							);
						} else {
							Cookies.set(
								Auth.COOKIE_REMEMBER_ME,
								0,
								pageCookieOpts
							);
							Cookies.remove(Auth.COOKIE_ACCOUNT);
						}
						// 2.重導至首頁
						toLanding();
					} else {
						captcha.handleRefresh();
						console.error(`status: ${status}`);
						switch (status.code) {
							case 401:
								toastEx.error(`登入失敗，請檢查帳號密碼是否正確`);
								break;
							case 429:
								toastEx.error(`帳號因密碼輸入多次錯誤遭到鎖定，請聯絡管理員`);
								break;
							default:
								toastEx.error("登入失敗", error);
								break;
						}
						Cookies.remove(Auth.COOKIE_LOGKEY);
					}
				} catch (err) {
					console.error("signinStub failed", err);
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
		[captcha, httpPostAsync, pageCookieOpts, toLanding]
	);

	const signInSubmitHandler = useCallback(
		({ setFocus }) =>
			(data) => {
				console.log("onSignInSubmit", data);
				const collected = {
					...data,
					captchaPassed: captcha.validate(data.captcha),
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
