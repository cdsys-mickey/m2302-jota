import { useWebApi } from "@/shared-hooks/useWebApi";
import DateFormats from "@/shared-modules/sd-date-formats";
import { format, parseISO } from "date-fns";
import { useMemo } from "react";
import { useCallback, useState } from "react";

export default function useApp() {
	const { httpGetAsync } = useWebApi();

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
			const { status, payload } = await httpGetAsync({
				url: "",
			});
			if (status.success) {
				setState((prev) => ({
					...prev,
					loading: false,
					apiVersion: payload.version,
					frontEnd: payload.frontEnd
				}));
			}
		} catch (err) {
			console.error("loadAppInto failed", err);
		} finally {
			setState((prev) => ({
				...prev,
				loading: false,
			}));
		}
	}, [httpGetAsync]);

	return {
		...state,
		fetch,
		version,
		setLoading,
		handleTokenChange,
		loadAppInfo
	}

}