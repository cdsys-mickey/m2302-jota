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
		lazy = true,
		queryParam = "q",
		// queryRequired = false,
		// paramsJson, //為了要讓參數被異動偵測機制判定為有異動，必須將參數序列化為 json 字串再傳進來
		querystring,
		params,
		headers,
		filterByServer = false,
		onChange,
		onOpen,
		onClose,
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
	} = opts;
	const { sendAsync } = useWebApi();

	// const [loading, setLoading] = useState(null);
	const [open, setOpen] = useState(false);

	const handleOpen = useCallback(() => {
		if (onOpen) {
			onOpen();
		}
		setOpen(true);
	}, [onOpen]);

	const handleClose = useCallback(() => {
		if (onClose) {
			onClose();
		}
		if (!disableClose) {
			setOpen(false);
		}
	}, [disableClose, onClose]);

	const [pickerState, setPickerState] = useState({
		loading: null,
		// query: null,
		options: defaultOptions,
		// open: false,
		noOptionsText: filterByServer ? typeToSearchText : noOptionsText,
	});

	const lazyLoadingTriggered = useMemo(() => {
		return (
			url &&
			!filterByServer &&
			lazy &&
			(pickerState.loading === null || pickerState.loading === undefined)
		);
	}, [lazy, pickerState.loading, filterByServer, url]);

	const loadOptions = useCallback(
		async ({ q, onError: onMethodError } = {}) => {
			console.log(`${id}.loadOptions(${q || ""})`);
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
						...params,
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

	/**
	 * 來源條件改變, 清空目前值, resetLoading
	 */
	useChangeTracking(() => {
		console.log(
			`url changed: ${url}${
				querystring ? " " + querystring : ""
			}, params:`,
			params
		);
		onChange(multiple ? [] : null);
		resetLoading();
	}, [url, querystring, params]);

	/** filterByServer 時, 關閉 popper 則重設 loading 狀態
	 */
	useChangeTracking(() => {
		console.log(
			"[filterByServer, open] changed:",
			`${filterByServer}, ${open}`
		);
		if (filterByServer && !open) {
			resetLoading();
		}
	}, [filterByServer, open]);

	/**
	 * 展開時 loadOptions
	 */
	useChangeTracking(() => {
		console.log(
			"[open, lazyLoadingTriggered] changed:",
			`${open}, ${lazyLoadingTriggered}`
		);
		if (open && lazyLoadingTriggered) {
			loadOptions();
		}
	}, [open, lazyLoadingTriggered]);

	return {
		lazyLoadingTriggered,
		loadOptions,
		clearOptions,
		resetLoading,
		...pickerState,
		onInputChange: handleInputChange,
		handleOpen,
		handleClose,
		open,
		disableClose,
	};
};
