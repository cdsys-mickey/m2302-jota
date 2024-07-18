import { useCallback, useState } from "react";
import { useWebApi } from "./useWebApi";
import { useRef } from "react";
import queryString from "query-string";
import { useMemo } from "react";
import { useChangeTracking } from "./useChangeTracking";

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
		findByInput,
		pressToFind,
	} = opts;
	const { sendAsync } = useWebApi();

	// const [loading, setLoading] = useState(null);
	// const [open, setOpen] = useState(false);

	// const handleOpen = useCallback(
	// 	(e) => {
	// 		console.log("WebApiOptions.onOpen", e);
	// 		if (open) {
	// 			return;
	// 		}
	// 		if (onOpen) {
	// 			onOpen(e);
	// 		}
	// 		setOpen(true);
	// 	},
	// 	[onOpen, open]
	// );

	// const handleClose = useCallback(() => {
	// 	if (onClose) {
	// 		onClose();
	// 	}
	// 	if (!disableClose) {
	// 		setOpen(false);
	// 	}
	// }, [disableClose, onClose]);

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
			// console.log("OptionPicker.onOpen", e);
			// console.log("open", open);
			if (popperOpen) {
				return;
			}
			if (!disableOpenOnInput || e.type === "click") {
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
			// console.log("OptionPicker.onClose", e);
			// console.log("open", popperOpen);
			if (!popperOpen) {
				return;
			}
			if (onClose) {
				onClose(e);
			}
			setPopperOpen(false);
		},
		[onClose, popperOpen]
	);

	const shouldLoadOptions = useMemo(() => {
		return (
			url &&
			popperOpen &&
			!queryRequired &&
			!disableLazy &&
			(pickerState.loading === null || pickerState.loading === undefined)
		);
	}, [url, popperOpen, queryRequired, disableLazy, pickerState.loading]);

	const getById = useCallback(
		async (id) => {
			try {
				const { status, payload, error } = await sendAsync({
					method,
					url,
					data: {
						id,
					},
					headers,
					...(bearer && {
						bearer,
					}),
				});
				if (status.success) {
					return payload;
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				console.error("getById failed", err);
			}
			return null;
		},
		[bearer, headers, method, sendAsync, url]
	);

	const loadOptions = useCallback(
		async (q, { onError: onMethodError } = {}) => {
			console.log(`${id}.loadOptions(${q || ""})`);
			// 每次找之前回復 noOptionsText
			// setLoading(true);
			setPickerState((prev) => ({
				...prev,
				loading: true,
				// noOptionsText: typeToSearchText,
			}));
			try {
				const { status, payload, error } = await sendAsync({
					method,
					url,
					data: {
						...(q && { [queryParam]: q }),
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
					setPickerState((prev) => ({
						...prev,
						// loading: false,
						options: loadedOptions || [],
						// error: error,
						// noOptionsText,
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
					// loading: false,
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
			// if (pressToFind) {
			// 	return;
			// }

			let qs = event.target.value;

			if (timerIdRef.current) {
				clearTimeout(timerIdRef.current);
			}
			if (filterByServer) {
				timerIdRef.current = setTimeout(() => {
					if (triggerServerFilter(qs)) {
						loadOptions(qs);
					} else {
						clearOptions();
					}
				}, triggerDelay);
			}
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

	const disabled = useMemo(() => {
		console.log("pickerState.options.length", pickerState.options.length);
		return disableOnSingleOption && pickerState.options.length < 2;
	}, [disableOnSingleOption, pickerState.options.length]);

	/**
	 * 來源條件改變, 清空目前值, resetLoading
	 */
	useChangeTracking(() => {
		if (debug) {
			console.log(
				`url changed: ${url}${
					querystring ? " " + querystring : ""
				}, params:`,
				params
			);
		}
		onChange(multiple ? [] : null);
		resetLoading();
	}, [url, querystring, params]);

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
			console.log("[shouldLoadOptions] changed:", `${shouldLoadOptions}`);
		}
		if (shouldLoadOptions) {
			loadOptions();
		}
	}, [shouldLoadOptions]);

	const _findByInput = useMemo(() => {
		if (!pressToFind) {
			return null;
		}
		return filterByServer ? getById : findByInput;
	}, [filterByServer, findByInput, getById, pressToFind]);

	return {
		shouldLoadOptions,
		loadOptions,
		clearOptions,
		resetLoading,
		...pickerState,
		noOptionsText: _noOptionsText,
		onInputChange: handleInputChange,
		// handleOpen,
		// handleClose,
		onChange,
		// open,
		disableClose,
		disabled,
		pressToFind,
		findByInput: _findByInput,
		open: popperOpen,
		onOpen: handleOpen,
		onClose: handleClose,
	};
};
