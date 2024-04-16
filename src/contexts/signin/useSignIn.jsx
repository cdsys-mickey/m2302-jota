import Cookies from "js-cookie";
import _ from "lodash";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAppRedirect from "@/hooks/useAppRedirect";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Auth from "../../modules/md-auth";
import Errors from "../../shared-modules/sd-errors";

const pageCookieOpts = {
	path: `${import.meta.env.VITE_PUBLIC_URL}/auth`,
	expires: 365,
};

const PARAM_ACCOUNT = "ac";
const PARAM_PWROD = "pw";

export const useSignIn = () => {
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
					console.log("status", status);
					console.log("payload", payload);
					if (error) {
						console.error(error);
					}

					if (status?.success) {
						// 1.儲存 Cookie
						Cookies.set(
							Auth.COOKIE_LOGKEY,
							payload.LogKey || "",
							Auth.COOKIE_OPTS
						);
						if (!isImpersonate) {
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
						console.error(`status: ${status}`);
						switch (status.code) {
							case 401:
								toast.warn(`登入失敗，請檢查帳號密碼是否正確`);
								break;
							case 429:
								toast.warn(
									`帳號因密碼輸入多次錯誤遭到鎖定，請聯絡管理員`
								);
								break;
							default:
								toast.error(
									error?.message ||
										`登入發生未預期 HTTP ${status.code} 例外，請稍後再試`
								);
								break;
						}
						Cookies.remove(Auth.COOKIE_LOGKEY);
					}
				} catch (err) {
					console.error("handleSignInSubmit failed", err);
					toast.error(Errors.getMessage("登入發生異常", err));
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

	return {
		...state,
		onSignInSubmit,
		onSignInSubmitError,
		onSignInXSubmit,
		onSignInXSubmitError,
	};
};
