import useAppRedirect from "@/hooks/useAppRedirect";
import { useWebApiAsync } from "@/shared-hooks";
import DateFormats from "@/shared-modules/DateFormats.mjs";
import { format, parseISO } from "date-fns";
import Cookies from "js-cookie";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ConfigContext, useConfig } from "shared-components/config";
import { useRegisterSW } from "virtual:pwa-register/react";

export default function useApp() {
	const { httpGetAsync } = useWebApiAsync();
	const appRedirect = useAppRedirect();
	const config = useContext(ConfigContext);
	const frontEndConfig = useConfig();
	// 版本資訊
	const version = useMemo(
		() =>
			format(
				parseISO(import.meta.env.BUILD_TIME),
				DateFormats.DATEFNS_VERSION
			),
		[]
	);

	const { needRefresh, updateServiceWorker } = useRegisterSW({});

	//COOKIE
	// const ROOT_COOKIE_OPTS = useMemo(
	// 	() => ({
	// 		path: `${config.PUBLIC_URL || "/"}`,
	// 		expires: 365,
	// 	}),
	// 	[config.PUBLIC_URL]
	// );

	// const AUTH_COOKIE_OPTS = useMemo(
	// 	() => ({
	// 		path: `${(config.PUBLIC_URL || "") + "/auth"}`,
	// 		expires: 365,
	// 	}),
	// 	[config.PUBLIC_URL]
	// );

	const [state, setState] = useState({
		data: null,
		loading: null,
		error: null,
		token: null,
		apiVersion: null,
		profile: null,
	});

	// const { redirectTo } = useRedirect();

	const handleTokenChange = useCallback((newToken) => {
		setState((prev) => ({
			...prev,
			token: newToken,
		}));
	}, []);

	const setLoading = useCallback((loading) => {
		setState((prev) => ({
			...prev,
			loading: loading,
		}));
	}, []);

	const loadAppInfo = useCallback(async () => {
		setState((prev) => ({
			...prev,
			loading: true,
		}));
		try {
			const { status, payload, error } = await httpGetAsync({
				url: "",
			});
			if (status.success) {
				let buildResult;
				if (import.meta.env.VITE_PROFILE !== "dev") {
					buildResult = await frontEndConfig.loadConfig([
						"build-result.json",
					]);
				}
				setState((prev) => ({
					...prev,
					loading: false,
					apiVersion: payload.version,
					// frontEnd: payload.frontEnd,
					profile: payload.profile,
					...(buildResult && {
						frontEnd: buildResult,
					}),
				}));
			} else {
				throw error || new Error("未預期例外");
			}
		} catch (err) {
			console.error("error object:", err);
			if (err?.status == 403 || err?.response?.status == 403) {
				appRedirect.toForbidden();
			}
			console.error("loadAppInto failed", err);
		} finally {
			setState((prev) => ({
				...prev,
				loading: false,
			}));
		}
	}, [appRedirect, frontEndConfig, httpGetAsync]);

	const unloadAppInfo = useCallback(async () => {
		setState((prev) => ({
			...prev,
			loading: true,
		}));
		try {
			const { status, payload, error } = await httpGetAsync({
				url: "",
			});
			if (status.success) {
				setState((prev) => ({
					...prev,
					loading: false,
					apiVersion: payload.version,
					// frontEnd: payload.frontEnd,
				}));
				appRedirect.toLogin();
			} else {
				throw error || new Error("未預期例外");
			}
		} catch (err) {
			console.error("error object:", err);
			console.error("loadAppInto failed", err);
		} finally {
			setState((prev) => ({
				...prev,
				loading: false,
			}));
		}
	}, [appRedirect, httpGetAsync]);

	const getSessionCookie = useCallback((key) => {
		const valueInSession = sessionStorage.getItem(key);
		return valueInSession || Cookies.get(key);
	}, []);

	const setSessionCookie = useCallback((key, value, opts) => {
		Cookies.set(key, value, opts);
		sessionStorage.setItem(key, value);
	}, []);

	const removeSessionValue = useCallback((key, opts) => {
		Cookies.remove(key, opts);
		sessionStorage.removeItem(key);
	}, []);

	return {
		...state,
		fetch,
		version,
		setLoading,
		handleTokenChange,
		loadAppInfo,
		unloadAppInfo,
		getSessionCookie,
		setSessionCookie,
		removeSessionValue,
		// ROOT_COOKIE_OPTS,
		// AUTH_COOKIE_OPTS,
		// for PWA
		needRefresh,
		updateServiceWorker,
	};
}
