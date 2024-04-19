import { useCallback, useState } from "react";
import { useWebApi } from "./useWebApi";
import { useRef } from "react";
import queryString from "query-string";
import { useMemo } from "react";

const defaultTriggerServerFilter = (q) => {
	return !!q;
};

const defaultGetData = (payload) => {
	return payload["data"];
	// return payload;
};

const defaultOnError = (err) => {
	console.error(`onError`, err);
};

export const useWebApiOptions = (opts = {}) => {
	const {
		// 辨識用, 與 OptionPicker.name 不同
		id = "NO_ID",
		//http
		url,
		method = "get",
		bearer,
		lazy = true,
		queryParam = "q",
		// queryRequired = false,
		// paramsJson, //為了要讓參數被異動偵測機制判定為有異動，必須將參數序列化為 json 字串再傳進來
		querystring,
		headers,
		filterByServer = false,
		// onChange,

		// for OptionPicker
		typeToSearchText = "請輸入關鍵字進行搜尋",
		noOptionsText = "無可用選項",
		fetchErrorText = "讀取失敗",
		triggerDelay = 700,
		defaultOptions = [],
		// METHODS
		triggerServerFilter = defaultTriggerServerFilter, // 是否驅動遠端搜尋
		getData = defaultGetData,
		onError = defaultOnError,
	} = opts;
	const { sendAsync } = useWebApi();

	// const [loading, setLoading] = useState(null);

	const [pickerState, setPickerState] = useState({
		loading: null,
		// query: null,
		options: defaultOptions,
		// open: false,
		noOptionsText: filterByServer ? typeToSearchText : noOptionsText,
	});

	const loadOptionsTriggered = useMemo(() => {
		return (
			url &&
			!filterByServer &&
			lazy &&
			(pickerState.loading === null || pickerState.loading === undefined)
		);
	}, [lazy, pickerState.loading, filterByServer, url]);

	const loadOptions = useCallback(
		async ({ q, onError: onMethodError } = {}) => {
			console.log(`${id}.loadOptions(${q})`);
			// 每次找之前回復 noOptionsText
			// setLoading(true);
			setPickerState((prev) => ({
				...prev,
				// query: q,
				loading: true,
				noOptionsText: typeToSearchText,
			}));
			try {
				const { status, payload, error } = await sendAsync({
					method,
					url,
					data: {
						...(q && { [queryParam]: q }),
						...(querystring && queryString.parse(querystring)),
					},
					headers,
					...(bearer && {
						bearer,
					}),
				});
				if (status.success) {
					setPickerState((prev) => ({
						...prev,
						// loading: false,
						options: getData(payload) || [],
						// error: error,
						noOptionsText,
					}));
				} else {
					throw error || "load options failed";
				}
			} catch (err) {
				// 正常情況不該跑到這裡
				console.error(`${id}.loadOptions failed`);
				if (onMethodError) {
					onMethodError(err);
				} else {
					onError(err);
				}
				setPickerState((prev) => ({
					...prev,
					options: [],
					// loading: false,
					error: {
						message: "unexpected error",
					},
					noOptionsText: fetchErrorText,
				}));
			} finally {
				// setLoading(false);
				setPickerState((prev) => ({
					...prev,
					loading: false,
				}));
			}
		},
		[
			id,
			typeToSearchText,
			sendAsync,
			method,
			url,
			queryParam,
			querystring,
			headers,
			bearer,
			getData,
			noOptionsText,
			onError,
			fetchErrorText,
		]
	);

	const clearOptions = useCallback(() => {
		setPickerState((prev) => ({
			...prev,
			options: [],
			...(filterByServer && {
				noOptionsText: typeToSearchText,
			}),
		}));
	}, [filterByServer, typeToSearchText]);

	const timerIdRef = useRef();

	const resetLoading = useCallback(() => {
		setPickerState((prevState) => ({
			...prevState,
			loading: null,
			options: [],
		}));
	}, []);

	const handleInputChange = useCallback(
		(event) => {
			let qs = event.target.value;
			// console.log(`text changed: `, qs); // for debug purpose, dont delete

			if (timerIdRef.current) {
				clearTimeout(timerIdRef.current);
			}
			timerIdRef.current = setTimeout(() => {
				if (filterByServer) {
					if (qs) {
						if (triggerServerFilter(qs)) {
							loadOptions({ q: qs });
						}
					} else {
						clearOptions();
					}
				}
			}, triggerDelay);
			setPickerState((prev) => ({
				...prev,
				query: qs,
			}));
		},
		[
			clearOptions,
			filterByServer,
			loadOptions,
			triggerDelay,
			triggerServerFilter,
		]
	);

	// const handleChange = (value) => {
	// 	if (
	// 		queryRequired &&
	// 		filterByServer &&
	// 		((!multiple && !value) ||
	// 			(multiple && Array.isArray(value) && value.length === 0))
	// 	) {
	// 		setPickerState((prevState) => ({
	// 			...prevState,
	// 			options: [],
	// 			noOptionsText: typeToSearchText,
	// 			loading: null,
	// 		}));
	// 		// setLoading(null);
	// 	}
	// 	if (onChange) {
	// 		onChange(value);
	// 	}
	// };

	// 當網址清空時, 重設 options, 退回到 loading = null 狀態
	// useEffect(() => {
	// 	if (!url) {
	// 		if (onChange) {
	// 			onChange(null, null);
	// 		}
	// 	}
	// 	// setLoading(null);
	// 	setPickerState((prev) => ({
	// 		...prev,
	// 		loading: null,
	// 	}));
	// }, [id, onChange, querystring, url]);

	return {
		loadOptionsTriggered,
		loadOptions,
		clearOptions,
		resetLoading,
		// for OptionPicker
		...pickerState,
		// pickerState,
		// pickerCallback: {
		// 	onInputChange: handleInputChange,
		// },
		onInputChange: handleInputChange,
	};
};
