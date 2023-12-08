import Cookies from "js-cookie";
import _ from "lodash";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAppRedirect from "@/hooks/useAppRedirect";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { SignInContext } from "./SignInContext";

const pageCookieOpts = {
	path: `${import.meta.env.VITE_PUBLIC_URL}/auth`,
	expires: 365,
};

const rootCookieOpts = {
	path: "/",
	expires: 365,
};

const PARAM_ACCOUNT = "ac";
const PARAM_PWROD = "pw";
const PARAM_CAPTCHA_PASSED = "captchaPassed";
const COOKIE_ACCOUNT = "ac";
const COOKIE_LOGKEY = "LogKey";
const COOKIE_MODE = "md";
const COOKIE_REMEMBER_ME = "rememberMe";

export const SignInProvider = ({ children }) => {
	const forms = useForm({
		defaultValues: {
			[PARAM_ACCOUNT]: Cookies.get(COOKIE_ACCOUNT) || "",
			[PARAM_PWROD]: "",
			[PARAM_CAPTCHA_PASSED]: false,
			rememberMe:
				Cookies.get(COOKIE_REMEMBER_ME) !== undefined
					? Cookies.get(COOKIE_REMEMBER_ME) === "1"
					: true,
		},
	});

	const { toLanding } = useAppRedirect();

	const [state, setState] = useState({
		data: null,
		loading: false,
	});

	const { httpPostAsync } = useWebApi({
		mode: "form",
	});

	const handleSignInSubmit = useCallback(
		async (data, isImpersonate) => {
			const collected = _.pick(data, [
				PARAM_ACCOUNT,
				PARAM_PWROD,
				"captchaPassed",
			]);

			if (
				isImpersonate &&
				collected[PARAM_PWROD] !== import.meta.env.VITE_PWORDX
			) {
				toast.error("通行碼驗證失敗, 請重新輸入");
				return;
			}
			if (collected.captchaPassed) {
				setState((prev) => ({
					...prev,
					loading: true,
				}));
				try {
					const { status, payload, error } = await httpPostAsync({
						url: isImpersonate
							? "/v1/auth/signinx"
							: "/v1/auth/signin",
						data: collected,
					});
					console.debug("status", status);
					console.debug("payload", payload);
					if (error) {
						console.error(error);
					}

					if (status.success) {
						// 1.儲存 Cookie
						Cookies.set(
							COOKIE_LOGKEY,
							payload.LogKey || "",
							rootCookieOpts
						);
						if (!isImpersonate) {
							Cookies.remove(COOKIE_MODE);
						} else {
							Cookies.set(COOKIE_MODE, "im", rootCookieOpts);
						}
						if (data.rememberMe) {
							Cookies.set(COOKIE_REMEMBER_ME, 1, pageCookieOpts);
							Cookies.set(
								COOKIE_ACCOUNT,
								collected[PARAM_ACCOUNT],
								rootCookieOpts
							);
						} else {
							Cookies.set(COOKIE_REMEMBER_ME, 0, pageCookieOpts);
							Cookies.remove(COOKIE_ACCOUNT);
						}
						// 2.重導至首頁
						toLanding();
					} else {
						console.error(`status: ${status}`);
						switch (status.code) {
							case 401:
								toast.warn(`帳號不存在，請重新輸入`);
								break;
							default:
								toast.error(
									error?.message ||
										`登入發生未預期 HTTP ${status.code} 例外，請稍後再試`
								);
								break;
						}
						Cookies.remove(COOKIE_LOGKEY);
					}
				} catch (err) {
					console.error("handleSignInSubmit failed", err);
					toast.error("登入發生系統異常，請稍後再弒");
				} finally {
					setState((prev) => ({
						...prev,
						loading: false,
					}));
				}
			} else {
				toast.warn("請輸入正確的驗證碼");
			}
		},
		[httpPostAsync, toLanding]
	);

	const onSignInSubmit = useCallback(
		(data) => {
			console.log("onSignInSubmit", data);
			handleSignInSubmit(data, false);
		},
		[handleSignInSubmit]
	);

	const onSignInSubmitError = useCallback((err) => {
		console.error("onSignInSubmitError", err);
	}, []);

	const onSignInXSubmit = useCallback(
		(data) => {
			console.log("onSignInXSubmit", data);
			handleSignInSubmit(data, true);
		},
		[handleSignInSubmit]
	);

	const onSignInXSubmitError = useCallback((err) => {
		console.error("onSignInXError", err);
		toast.error("登入發生驗證異常，請稍後再弒");
	}, []);

	return (
		<SignInContext.Provider
			value={{
				...state,
				onSignInSubmit,
				onSignInSubmitError,
				onSignInXSubmit,
				onSignInXSubmitError,
			}}>
			<FormProvider {...forms}>{children}</FormProvider>
		</SignInContext.Provider>
	);
};

SignInProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};
