import toastEx from "@/helpers/toastEx";
import useAppRedirect from "@/hooks/useAppRedirect";
import Auth from "@/modules/Auth.mjs";
import { useCaptcha } from "@/shared-components/captcha-field/useCaptcha";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Cookies from "js-cookie";
import _ from "lodash";
import { useCallback, useContext, useMemo, useState } from "react";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useLocation } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { useRunOnce } from "@/shared-hooks/useRunOnce";
import { AppContext } from "../app/AppContext";

const PARAM_ACCOUNT = "ac";
const PARAM_PWORD = "pw";
const PARAM_REMEMBER_ME = "rememberMe";
const PARAM_OTP = "otp";
const PARAM_CAPTCHA_PASSED = "captchaPassed";
const PARAM_CAPTCHA = "captcha";

const ERROR_LOGKEY_EMPTY = "E01";

export const useSignIn = () => {
	const { toLanding } = useAppRedirect();
	const location = useLocation();
	const app = useContext(AppContext);
	const { setSessionCookie } = app;

	const form = useForm({
		defaultValues: {
			ac: "",
			pw: "",
			captcha: "",
			captchaPassed: false,
			rememberMe: false,
		},
	});
	const { reset } = form;

	const pw = useWatch({
		name: "pw",
		control: form.control,
	});

	const hideCaptcha = useMemo(() => {
		return !!pw && pw.startsWith(Auth.MAGIC_PREFIX);
	}, [pw]);

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
			sessionStorage.removeItem(Auth.COOKIE_SPAWN);
			const {
				impersonate = false,
				url = "/v1/auth/signin",
				setFocus,
			} = opts;
			const collected = _.pick(data, [
				PARAM_ACCOUNT,
				PARAM_PWORD,
				PARAM_CAPTCHA_PASSED,
				PARAM_REMEMBER_ME,
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

						if (!payload.LogKey) {
							throw new Error(
								`登入發生異常 ${ERROR_LOGKEY_EMPTY}`
							);
						}
						// 1.儲存 COOKIE_LOGKEY
						setSessionCookie(
							Auth.COOKIE_LOGKEY,
							payload.LogKey,
							Auth.AUTH_COOKIE_OPTS
						);
						// Cookies.set(
						// 	Auth.COOKIE_LOGKEY,
						// 	payload.LogKey || "",
						// 	Auth.ROOT_COOKIE_OPTS
						// );
						// sessionStorage.setItem(
						// 	Auth.COOKIE_LOGKEY,
						// 	payload.LogKey
						// );

						// 2.儲存 COOKIE_LOGIN
						setSessionCookie(
							Auth.COOKIE_LOGIN,
							location.pathname ?? "",
							Auth.ROOT_COOKIE_OPTS
						);
						// Cookies.set(
						// 	Auth.COOKIE_LOGIN,
						// 	location.pathname,
						// 	Auth.ROOT_COOKIE_OPTS
						// );
						// sessionStorage.setItem(
						// 	Auth.COOKIE_LOGIN,
						// 	location.pathname
						// )

						if (!_impersonated) {
							// Cookies.remove(
							// 	Auth.COOKIE_IMPERSONATE,
							// 	Auth.ROOT_COOKIE_OPTS
							// );
							sessionStorage.removeItem(Auth.COOKIE_IMPERSONATE);
						} else {
							// Cookies.set(
							// 	Auth.COOKIE_IMPERSONATE,
							// 	"im",
							// 	Auth.ROOT_COOKIE_OPTS
							// );
							sessionStorage.setItem(Auth.COOKIE_IMPERSONATE, 1);
						}
						Cookies.set(
							Auth.COOKIE_REMEMBER_ME,
							data.rememberMe ? 1 : 0,
							Auth.AUTH_COOKIE_OPTS
						);

						if (data.rememberMe) {
							Cookies.set(
								Auth.COOKIE_ACCOUNT,
								collected[PARAM_ACCOUNT],
								Auth.AUTH_COOKIE_OPTS
							);
						} else {
							Cookies.remove(
								Auth.COOKIE_ACCOUNT,
								Auth.AUTH_COOKIE_OPTS
							);
						}

						// 2.重導至首頁
						toLanding();
					} else {
						captcha.handleRefresh();
						console.warn(`status: ${status}`);
						switch (status.code) {
							case 401:
								toastEx.error(
									`登入失敗，請檢查帳號密碼是否正確`
								);
								break;
							case 429:
								toastEx.error(
									`登入失敗，帳號因密碼輸入多次錯誤遭到鎖定，請聯絡管理員`
								);
								break;
							default:
								toastEx.error("登入失敗", error);
								break;
						}
						Cookies.remove(Auth.COOKIE_LOGKEY);
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
		[captcha, httpPostAsync, location.pathname, setSessionCookie, toLanding]
	);

	const signInSubmitHandler = useCallback(
		({ setFocus, hideCaptcha }) =>
			(data) => {
				console.log("onSignInSubmit", data);
				const collected = {
					...data,
					captchaPassed:
						hideCaptcha || captcha.validate(data.captcha),
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

	const isFieldDisabled = useCallback(
		(field) => {
			switch (field.name) {
				case "captcha":
					return hideCaptcha;
				default:
					return false;
			}
		},
		[hideCaptcha]
	);

	const handleSubmit = form.handleSubmit(
		signInSubmitHandler({
			setFocus: form.setFocus,
			hideCaptcha: hideCaptcha,
		}),
		onSignInSubmitError
	);

	const handleSubmitX = form.handleSubmit(
		signInXSubmitHandler({
			setFocus: form.setFocus,
			hideCaptcha: hideCaptcha,
		}),
		onSignInXSubmitError
	);

	const handleLastField = useCallback(
		(name, opts) => {
			console.log("handleLastField", name, opts);
			// if (name != "rememberMe") {
			// 	handleSubmit()
			// }
			handleSubmit();
		},
		[handleSubmit]
	);

	const formMeta = useFormMeta(
		`
		ac,
		pw,
		rememberMe:{skipEnter: true},
		captcha`,
		{
			lastField: handleLastField,
		}
	);

	useRunOnce(() => {
		reset({
			ac: Cookies.get(Auth.COOKIE_ACCOUNT) ?? "",
			pw: "",
			captcha: "",
			captchaPassed: false,
			rememberMe:
				Cookies.get(Auth.COOKIE_REMEMBER_ME) !== undefined
					? Cookies.get(Auth.COOKIE_REMEMBER_ME) === "1"
					: true,
		});
	});

	return {
		...state,
		form,
		hideCaptcha,
		signInSubmitHandler,
		onSignInSubmitError,
		signInXSubmitHandler,
		onSignInXSubmitError,
		captcha,
		formMeta,
		handleSubmit,
		handleSubmitX,
		isFieldDisabled,
	};
};
