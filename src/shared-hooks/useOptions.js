import { useCallback, useState } from "react";
import useWebApiAsync from "./useWebApi/useWebApiAsync";
import { useEffect } from "react";
import { useMemo } from "react";

const defaultGetOptions = (payload) => {
	return payload["data"];
};

export const useOptions = ({
	url,
	method = "get",
	params,
	bearer,
	defaultOptions = [],
	getOptions = defaultGetOptions,
}) => {
	const { sendAsync } = useWebApiAsync();
	const [optionsLoading, setOptionsLoading] = useState();
	const [optionsError, setOptionsError] = useState();

	const [optionsData, setOptionsData] = useState(defaultOptions);

	const loadOptions = useCallback(async () => {
		console.log("loadOptions", params);
		setOptionsLoading(true);
		try {
			const { status, payload, error } = await sendAsync({
				method,
				bearer,
				url,
				params,
			});

			if (status.success) {
				setOptionsData(getOptions(payload));
			} else {
				throw error ?? new Error("未預期例外");
			}
		} catch (err) {
			console.error("loadOptions failed", err);
			setOptionsError(err);
		} finally {
			setOptionsLoading(false);
		}
	}, [bearer, getOptions, method, params, sendAsync, url]);

	const clearOptions = useCallback(() => {
		console.log("clearOptions");
		setOptionsData([]);
		setOptionsLoading(null);
	}, []);

	const optionsNotLoaded = useMemo(() => {
		return optionsLoading === null || optionsLoading === undefined;
	}, [optionsLoading]);

	const optionsLoaded = useMemo(() => {
		return optionsLoading === false;
	}, [optionsLoading]);

	return {
		optionsLoading,
		optionsError,
		optionsData,
		loadOptions,
		clearOptions,
		// synthetic props
		optionsNotLoaded,
		optionsLoaded,
	};
};
