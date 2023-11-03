import Cookies from "js-cookie";
import _ from "lodash";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAppRedirect from "@/hooks/useAppRedirect";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { SignInContext } from "./SignInContext";

const PARAM_ACCOUNT = "ac";
const PARAM_PWROD = "pw";
const PARAM_CAPTCHA_PASSED = "captchaPassed";
const COOKIE_ACCOUNT = "ac";
const COOKIE_LOGKEY = "LogKey";
const COOKIE_MODE = "md";

export const SignInProvider = ({ children }) => {
	const forms = useForm({
		defaultValues: {
			[PARAM_ACCOUNT]: Cookies.get(COOKIE_ACCOUNT) || "",
			[PARAM_PWROD]: "",
			[PARAM_CAPTCHA_PASSED]: false,
			rememberMe: true,
		},
	});

	const { redirectToLanding } = useAppRedirect();

	const [state, setState] = useState({
		data: null,
		loading: false,
	});

	const { httpPostAsync } = useWebApi({
		mode: "form",
	});

	const onSignInSubmit = useCallback(
		async (data) => {
			console.log("onSignInSubmit", data);
			const collected = _.pick(data, [
				PARAM_ACCOUNT,
				PARAM_PWROD,
				"captchaPassed",
			]);

			if (data.captchaPassed) {
				setState((prev) => ({
					...prev,
					loading: true,
				}));
				try {
					const { status, payload, error } = await httpPostAsync({
						url: "/v1/auth/signin",
						data: collected,
					});
					console.debug("status", status);
					console.debug("payload", payload);
					if (error) {
						console.error(error);
					}
					if (status.success) {
						// 1.儲存 Cookie
						Cookies.set(COOKIE_LOGKEY, payload.LogKey || "");
						Cookies.remove(COOKIE_MODE);

						// 2.重導至首頁
						// redirectTo("/mock/A01");
						redirectToLanding();
					} else {
						console.error(`status ${status}`);
						toast.warn(error?.message);
						Cookies.remove(COOKIE_LOGKEY);
					}
				} catch (err) {
					console.error("onSignInXSubmit failed", err);
					toast.error("登入發生系統異常，請稍後再弒");
				} finally {
					setState((prev) => ({
						...prev,
						loading: false,
					}));
				}
			} else {
				toast.error("請輸入正確的驗證碼");
			}
		},
		[httpPostAsync, redirectToLanding]
	);

	const onSignInSubmitError = useCallback((err) => {
		console.error("onSignInSubmitError", err);
	}, []);

	const onSignInXSubmit = useCallback(
		async (data) => {
			console.log("onSignInXSubmit", data);
			const collected = _.pick(data, [
				PARAM_ACCOUNT,
				PARAM_PWROD,
				"captchaPassed",
			]);

			if (collected[PARAM_PWROD] !== import.meta.env.VITE_PWORDX) {
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
						url: "/v1/auth/signinx",
						data: collected,
					});
					console.debug("status", status);
					console.debug("payload", payload);
					if (error) {
						console.error(error);
					}

					if (status.success) {
						// 1.儲存 Cookie
						Cookies.set(COOKIE_LOGKEY, payload.LogKey || "");
						if (data.rememberMe) {
							Cookies.set(
								COOKIE_ACCOUNT,
								collected[PARAM_ACCOUNT]
							);
							Cookies.set(COOKIE_MODE, "im");
						} else {
							Cookies.remove(COOKIE_ACCOUNT);
						}
						// 2.重導至首頁
						// redirectTo("/mock/A01");
						redirectToLanding();
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
					console.error("onSignInXSubmit failed", err);
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
		[httpPostAsync, redirectToLanding]
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
