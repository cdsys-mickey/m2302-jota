import useAppRedirect from "@/hooks/useAppRedirect";
import Auth from "@/modules/md-auth";
import { useWebApi } from "@/shared-hooks/useWebApi";
import DateFormats from "@/shared-modules/DateFormats.mjs";
import { format, parseISO } from "date-fns";
import Cookies from "js-cookie";
import { useMemo } from "react";
import { useCallback, useState } from "react";

export default function useApp() {
	const { httpGetAsync } = useWebApi();
	const appRedirect = useAppRedirect();
	// 版本資訊
	const version = useMemo(
		() =>
			format(
				parseISO(import.meta.env.BUILD_TIME),
				DateFormats.DATEFNS_VERSION
			),
		[]
	);

	const [state, setState] = useState({
		data: null,
		loading: null,
		error: null,
		token: null,
		apiVersion: null,
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
				setState((prev) => ({
					...prev,
					loading: false,
					apiVersion: payload.version,
					frontEnd: payload.frontEnd
				}));
			} else {
				throw error || new Error("未預期例外")
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
	}, [appRedirect, httpGetAsync]);

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
					frontEnd: payload.frontEnd
				}));
				appRedirect.toLogin();
			} else {
				throw error || new Error("未預期例外")
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

	const getSessionValue = useCallback((key) => {
		const valueInSession = sessionStorage.getItem(key);
		const valueInCookie = Cookies.get(key);
		return valueInSession || valueInCookie;
	}, []);

	const setSessionValue = useCallback((key, value, opts) => {
		Cookies.set(
			key,
			value,
			opts
		);
		sessionStorage.setItem(
			key,
			value
		)
	}, []);

	const removeSessionValue = useCallback((key, opts) => {
		Cookies.remove(
			key,
			opts
		);
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
		getSessionValue,
		setSessionValue,
		removeSessionValue
	}

}