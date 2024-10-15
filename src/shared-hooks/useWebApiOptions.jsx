import queryString from "query-string";
import { useCallback, useMemo, useRef, useState } from "react";
import Types from "../shared-modules/sd-types";
import { useChangeTracking } from "./useChangeTracking";
import { useWebApi } from "./useWebApi";

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
		multiple,
		id = "NO_ID",
		//http
		url,
		method = "get",
		bearer,
		disableLazy,
		queryParam = "q",
		inputParam = "id",
		// paramsJson, //為了要讓參數被異動偵測機制判定為有異動，必須將參數序列化為 json 字串再傳進來
		querystring,
		params,
		headers,
		filterByServer = false,
		queryRequired = false,
		onChange,
		open,
		onOpen,
		onClose,
		disableOpenOnInput,
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
		disableClose,
		disableOnSingleOption,
		debug = false,
		// Enter & Tab
		findByInput = false,
		resetOnChange = false,
		resetValueOnChange = false,
		resetOptionsOnChange = false,
		// pressToFind,
		...rest
	} = opts;
	const { sendAsync } = useWebApi();

	const [pickerState, setPickerState] = useState({
		loading: null,
		query: null,
		options: defaultOptions,
		// open: false,
		// noOptionsText: queryRequired ? typeToSearchText : noOptionsText,
	});

	const [_noOptionsText, setNoOptionsText] = useState(
		queryRequired ? typeToSearchText : noOptionsText
	);

	const [popperOpen, setPopperOpen] = useState(open || false);

	const handleOpen = useCallback(
		(e) => {
			if (popperOpen) {
				return;
			}
			if (
				!disableOpenOnInput ||
				e.type === "click" ||
				(e.type === "keydown" && e.key === "ArrowDown")
			) {
				if (onOpen) {
					onOpen(e);
				}
				setPopperOpen(true);
			}
		},
		[popperOpen, disableOpenOnInput, onOpen]
	);

	const handleClose = useCallback(
		(e) => {
			if (!popperOpen) {
				return;
			}
			if (onClose) {
				onClose(e);
			}
			if (!disableClose) {
				setPopperOpen(false);
			}
			// 若有讀取失敗, 則清除讀取狀態
			setPickerState((prev) => ({
				...prev,
				...(prev.error && {
					loading: null,
				}),
			}));
		},
		[disableClose, onClose, popperOpen]
	);

	const shouldLoadOptions = useMemo(() => {
		return (
			url &&
			(disableLazy ||
				(popperOpen && (!queryRequired || pickerState.query))) &&
			(pickerState.loading === null || pickerState.loading === undefined)
		);
	}, [
		url,
		disableLazy,
		popperOpen,
		queryRequired,
		pickerState.query,
		pickerState.loading,
	]);

	const getByInput = useCallback(
		async (input) => {
			// 避免使用空 input 進行搜尋
			if (!input) {
				return null;
			}
			const { status, payload, error } = await sendAsync({
				method,
				url,
				data: {
					[inputParam]: input,
					...(querystring && queryString.parse(querystring)),
					...params,
				},
				headers,
				...(bearer && {
					bearer,
				}),
			});
			if (status.success) {
				return getData(payload)?.[0];
			} else {
				throw error || new Error("未預期例外");
			}
		},
		[
			bearer,
			getData,
			headers,
			inputParam,
			method,
			params,
			querystring,
			sendAsync,
			url,
		]
	);

	const loadOptions = useCallback(
		async (query, { onError: onMethodError } = {}) => {
			console.log(`${id}.loadOptions(${query || ""})`);
			// 每次找之前回復 noOptionsText
			// setLoading(true);
			setPickerState((prev) => ({
				...prev,
				loading: true,
				error: null,
				// noOptionsText: typeToSearchText,
			}));
			try {
				const { status, payload, error } = await sendAsync({
					method,
					url,
					data: {
						...(query && { [queryParam]: query }),
						...(querystring && queryString.parse(querystring)),
						...params,
					},
					headers,
					...(bearer && {
						bearer,
					}),
				});
				if (status.success) {
					const loadedOptions = getData(payload);
					// 只有成功才會將 loading 註記為 false
					setPickerState((prev) => ({
						...prev,
						options: loadedOptions || [],
						loading: false,
					}));
					setNoOptionsText(noOptionsText);
				} else {
					throw error || "load options failed";
				}
			} catch (err) {
				// 正常情況不該跑到這裡
				console.error(`${id}.loadOptions failed`, err);
				if (onMethodError) {
					onMethodError(err);
				} else {
					onError(err);
				}
				setPickerState((prev) => ({
					...prev,
					options: [],
					error: {
						message: "unexpected error",
					},
					// noOptionsText: fetchErrorText,
				}));
				setNoOptionsText(fetchErrorText);
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
			sendAsync,
			method,
			url,
			queryParam,
			querystring,
			params,
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
			// ...(queryRequired && {
			// 	noOptionsText: typeToSearchText,
			// }),
		}));
		setNoOptionsText(queryRequired ? typeToSearchText : noOptionsText);
	}, [noOptionsText, queryRequired, typeToSearchText]);

	const lazyLoadingRef = useRef();

	const resetLoading = useCallback(() => {
		setPickerState((prevState) => ({
			...prevState,
			loading: null,
			options: [],
		}));
	}, []);

	const handleInputChange = useCallback(
		(event) => {
			// if (pressToFind) {
			// 	return;
			// }

			const qs = event.target.value;
			if (disableOpenOnInput) {
				setPickerState((prev) => ({
					...prev,
					query: qs,
				}));
			}

			if (!popperOpen) {
				if (filterByServer) {
					setPickerState((prev) => ({
						...prev,
						loading: null,
					}));
				}
				return;
			}

			// 當 filterByServer 時才 loadOptions
			if (filterByServer) {
				if (lazyLoadingRef.current) {
					clearTimeout(lazyLoadingRef.current);
				}

				lazyLoadingRef.current = setTimeout(() => {
					if (triggerServerFilter(qs)) {
						loadOptions(qs);
					} else {
						clearOptions();
					}
				}, triggerDelay);
			}
		},
		[clearOptions, disableOpenOnInput, filterByServer, loadOptions, popperOpen, triggerDelay, triggerServerFilter]
	);

	const disabled = useMemo(() => {
		// console.log("pickerState.options.length", pickerState.options.length);
		return disableOnSingleOption && pickerState.options.length < 2;
	}, [disableOnSingleOption, pickerState.options.length]);

	/**
	 * 來源條件改變, 清空目前值, resetLoading
	 */
	useChangeTracking(() => {
		if (resetOnChange || resetValueOnChange) {
			// if (debug) {
			console.log(
				`${id}.resetValueOnChange: ${url}${querystring ? " " + querystring : ""
				}, params:`,
				params
			);
			// }
			onChange(multiple ? [] : null);
			// resetLoading();
		}
	}, [url, querystring, params]);

	useChangeTracking(() => {
		if (resetOnChange || resetOptionsOnChange) {
			// if (debug) {
			console.log(
				`${id}.resetOptionsOnChange: ${url}${querystring ? " " + querystring : ""
				}, params:`,
				params
			);
			// }
			// onChange(multiple ? [] : null);
			resetLoading();
		}
	}, [url, querystring, params])

	/** filterByServer 時, 關閉 popper 則重設 loading 狀態
	 */
	useChangeTracking(() => {
		if (debug) {
			console.log(
				"[filterByServer, open] changed:",
				`${filterByServer}, ${open}`
			);
		}
		if (filterByServer && !open) {
			resetLoading();
		}
	}, [filterByServer, open]);

	/**
	 * 展開時 loadOptions
	 */
	useChangeTracking(() => {
		if (debug) {
			console.log(
				`${id}.[shouldLoadOptions] changed:`,
				`${shouldLoadOptions}`
			);
		}
		if (shouldLoadOptions) {
			// loadOptions();
			// 嘗試 popperOpen 時同步 options
			loadOptions(queryRequired ? pickerState.query : null);
		}
	}, [shouldLoadOptions]);

	const _findByInput = useMemo(() => {
		return Types.isBoolean(findByInput) && !findByInput
			? getByInput
			: findByInput;
	}, [findByInput, getByInput]);

	return {
		shouldLoadOptions,
		loadOptions,
		clearOptions,
		resetLoading,
		...pickerState,
		noOptionsText: _noOptionsText,
		onInputChange: handleInputChange,
		onChange,
		// open,
		// disableClose,
		disabled,
		// pressToFind,
		findByInput: _findByInput,
		open: popperOpen,
		onOpen: handleOpen,
		onClose: handleClose,
		...rest,
	};
};
