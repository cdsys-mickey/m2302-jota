import useAppRedirect from "@/hooks/useAppRedirect";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Cookies from "js-cookie";
import _ from "lodash";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import Auth from "@/modules/md-auth";
import { useCaptcha } from "@/shared-components/captcha-field/useCaptcha";
import Errors from "@/shared-modules/sd-errors";
import { useFormMeta } from "../../shared-contexts/form-meta/useFormMeta";

const pageCookieOpts = {
	path: `${import.meta.env.VITE_PUBLIC_URL}/auth`,
	expires: 365,
};

const PARAM_ACCOUNT = "ac";
const PARAM_PWORD = "pw";
const PARAM_CAPTCHA = "captcha";

export const useSignIn = () => {
	const { toLanding } = useAppRedirect();
	const formMeta = useFormMeta(`ac,pw,rememberMe:{skipEnter: true},captcha`);
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
				toast.error("通行碼驗證失敗, 請重新輸入", {
					position: "top-center"
				});
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
								toast.error(`登入失敗，請檢查帳號密碼是否正確`, {
									position: "top-center"
								});
								break;
							case 429:
								toast.error(
									`帳號因密碼輸入多次錯誤遭到鎖定，請聯絡管理員`, {
									position: "top-center"
								}
								);
								break;
							default:
								// toast.error(
								// 	error?.message ||
								// 		`登入發生未預期例外 HTTP ${status.code}，請稍後再試`
								// );
								toast.error(
									Errors.getMessage("登入失敗", error), {
									position: "top-center"
								}
								);
								break;
						}
						Cookies.remove(Auth.COOKIE_LOGKEY);
					}
				} catch (err) {
					console.error("signinStub failed", err);
					toast.error(Errors.getMessage("登入發生異常", err), {
						position: "top-center"
					});
				} finally {
					setState((prev) => ({
						...prev,
						loading: false,
					}));
				}
			} else {
				toast.error("請輸入正確的驗證碼", {
					position: "top-center"
				});
				captcha.handleRefresh();
				if (setFocus) {
					setFocus(PARAM_CAPTCHA, {
						shouldSelect: true,
					});
				}
			}
		},
		[captcha, httpPostAsync, toLanding]
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
		// toast.error("登入發生驗證異常，請稍後再弒");
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
