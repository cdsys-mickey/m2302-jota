import React, { createContext, useCallback, useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useRedirect from "@/shared-hooks/useRedirect";
import { toast } from "react-toastify";
import { useWebApi } from "../shared-hooks/useWebApi";
import _ from "lodash";
import Cookie from "js-cookie";
import Cookies from "js-cookie";

export const SignInContext = createContext();

export const SignInProvider = ({ children }) => {
	const forms = useForm({
		defaultValues: {
			accName: "",
			pword: "",
			captchaPassed: false,
			rememberMe: true,
		},
	});
	const { redirectTo } = useRedirect();

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
			const collected = _.pick(data, ["ac", "pw", "captchaPassed"]);

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
						Cookies.set("token", payload.token || "");

						// 2.重導至首頁
						// redirectTo("/mock/A01");
						redirectTo("/home");
					} else {
						console.error(`status ${status}`);
						toast.warn(error?.message);
						Cookies.remove("token");
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
		[httpPostAsync, redirectTo]
	);

	const onSignInSubmitError = useCallback((err) => {
		console.error("onSignInSubmitError", err);
	}, []);

	const onSignInXSubmit = useCallback(
		async (data) => {
			console.log("onSignInXSubmit", data);
			const collected = _.pick(data, ["ac", "pw", "captchaPassed"]);

			if (collected.pw !== import.meta.env.VITE_PWORDX) {
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
						Cookies.set("token", payload.token || "");

						// 2.重導至首頁
						// redirectTo("/mock/A01");
						redirectTo("/home");
					} else {
						console.error(`status: ${status}`);
						switch (status.code) {
							case 401:
								toast.warn(`帳號不存在，請重新輸入`);
								break;
							default:
								toast.error(error?.message);
								break;
						}
						Cookies.remove("token");
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
		[httpPostAsync, redirectTo]
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
