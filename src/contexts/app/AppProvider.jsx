import { useInit } from "@/shared-hooks/useInit";
import { useWebApi } from "@/shared-hooks/useWebApi";
import DateFormats from "@/shared-modules/md-date-formats";
import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";
import { useCallback, useMemo, useState } from "react";
import { AppContext } from "./AppContext";

const AppProvider = ({ children }) => {
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
		// operator: null,
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

	const loadAppInto = useCallback(async () => {
		setState((prev) => ({
			...prev,
			loading: true,
		}));
		try {
			const { status, payload } = await httpGetAsync({
				url: "",
			});
			if (status.success) {
				console.debug("payload", payload);
				setState((prev) => ({
					...prev,
					loading: false,
					apiVersion: payload.version,
				}));
			}
		} finally {
			setState((prev) => ({
				...prev,
				loading: false,
			}));
		}
	}, [httpGetAsync]);

	useInit(() => {
		loadAppInto();
	}, []);

	return (
		<AppContext.Provider
			value={{
				...state,
				fetch,
				version,
				setLoading,
				// validateToken,
				handleTokenChange,
				// REDIRECTS
				// redirectToLanding,
				// redirectToLogin
			}}>
			{children}
		</AppContext.Provider>
	);
};

AppProvider.propTypes = {
	children: PropTypes.node,
};

export { AppProvider };