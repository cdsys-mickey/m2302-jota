/* eslint-disable no-mixed-spaces-and-tabs */
import queryString from "query-string";
import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import Types from "@/shared-modules/Types.mjs";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import useWebApiAsync from "@/shared-hooks/useWebApi/useWebApiAsync";
import CommonCSS from "@/shared-modules/CommonCSS.mjs";
import useSharedOptions from "./useSharedOptions";
import { SharedOptionsContext } from "./SharedOptionsContext";
import ConsoleStyles from "@/shared-modules/ConsoleStyles.mjs";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import Objects from "@/shared-modules/Objects.mjs";

const defaultTriggerServerFilter = (q) => {
	return !!q;
};

const defaultGetOptions = (payload) => {
	// return payload && typeof payload === 'object' && 'data' in payload && Array.isArray(payload.data)
	// 	? payload.data
	// 	: payload;
	return payload.data;
};

const defaultGetCount = (payload) => {
	return payload.Select?.TotalRecord;
};

const defaultOnError = (err) => {
	console.error(`onError`, err);
};

export const useWebApiOptions = (opts = {}) => {
	const {
		infinite,
		// 辨識用, 與 OptionPicker.name 不同
		multiple,
		name = "NO_ID",
		//http
		url,
		options,
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
		triggerDelay = 500,
		defaultOptions = [],
		// METHODS
		triggerServerFilter = defaultTriggerServerFilter, // 是否驅動遠端搜尋
		getOptions = defaultGetOptions,
		getCount: getTotalRecords = defaultGetCount,
		onError = defaultOnError,
		disableClose,
		disableOnSingleOption,
		debug = false,
		// Enter & Tab
		findByInput,
		clearOnChange = false,
		clearValueOnChange = false,
		clearOptionsOnChange = false,
		// pressToFind,
		mockDelay = 0,
		sharedKey,
		...rest
	} = opts;
	const { sendAsync } = useWebApiAsync();

	const isMock = useMemo(() => {
		return mockDelay > 0;
	}, [mockDelay]);

	const [pickerState, setPickerState] = useState({
		loading: null,
		query: null,
		// options: defaultOptions,
	});

	const [_options, setOptions] = useSharedOptions({
		sharedKey,
		defaultOptions,
		onInit: () => {
			setPickerState((prev) => ({
				...prev,
				loading: false,
			}));
		},
	});
	const sharedOptions = useContext(SharedOptionsContext);

	const [_noOptionsText, setNoOptionsText] = useState(
		queryRequired ? typeToSearchText : noOptionsText
	);

	const [popperOpen, setPopperOpen] = useState(open || false);

	const openPopper = useCallback(() => {
		setPopperOpen(true);
	}, []);

	const closePopper = useCallback(() => {
		setPopperOpen(false);
	}, []);

	const handleChange = useCallback(
		(newValue, reason) => {
			onChange(newValue, reason);
		},
		[onChange]
	);

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
			// if (!popperOpen) {
			// 	return;
			// }
			console.log(`useWebApiOptions.handleClose`);

			if (!disableClose) {
				setPopperOpen(false);
			}
			if (onClose) {
				onClose(e);
			}
			// 若有讀取失敗, 則清除讀取狀態
			setPickerState((prev) => {
				if (prev.error) {
					console.log("由於 prev.error, 將 loading 重設為 null");
				}
				return {
					...prev,
					...(prev.error && {
						loading: null,
					}),
				};
			});
		},
		[disableClose, onClose]
	);

	const shouldLoadOptions = useMemo(() => {
		return (
			(url || isMock) &&
			(disableLazy ||
				(popperOpen && (!queryRequired || pickerState.query))) &&
			pickerState.loading == null
		);
	}, [
		url,
		isMock,
		disableLazy,
		popperOpen,
		queryRequired,
		pickerState.query,
		pickerState.loading,
	]);

	const fetchByInput = useCallback(
		async (input) => {
			// 避免使用空 input 進行搜尋
			if (!input) {
				console.log(
					"%cInput is empty, fetchByInput aborted",
					ConsoleStyles.WARN
				);
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
				return getOptions(payload)?.[0];
			} else {
				throw error ?? new Error("未預期例外");
			}
		},
		[
			bearer,
			getOptions,
			headers,
			inputParam,
			method,
			params,
			querystring,
			sendAsync,
			url,
		]
	);

	const mockFetchOptions = useCallback(async () => {
		setPickerState((prev) => ({
			...prev,
			loading: true,
			error: null,
		}));
		console.log("開始模擬延遲");
		await new Promise((resolve) => setTimeout(resolve, mockDelay));
		console.log("模擬延遲結束");
		setPickerState((prev) => ({
			...prev,
			// options: options,
			loading: false,
		}));
		setOptions(options);
	}, [mockDelay, options, setOptions]);

	const fetchOptions = useCallback(
		async (query, { onError: _onError } = {}) => {
			console.log(`${name}.fetchOptions(${query || ""})`);
			setPickerState((prev) => ({
				...prev,
				loading: true,
				error: null,
			}));
			const handleError = _onError ?? onError;
			// 解決滑鼠先移到 Listbox 位置而選不到項目的問題
			// await new Promise((resolve) => setTimeout(resolve, 300));
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
					let __options;
					const loadedOptions = getOptions(payload);
					// 只有 filterByServer 時此訊息才有意義
					if (filterByServer) {
						const totalRecords = getTotalRecords(payload);
						const leftRows = totalRecords - loadedOptions?.length;
						console.log("leftRows", leftRows);
						__options = Types.isArray(loadedOptions)
							? [
									...loadedOptions,
									...(leftRows > 0
										? [
												{
													id: "footer",
													message: `(僅顯示前 ${loadedOptions.length}/${totalRecords} 筆, 輸入關鍵字查看更多)`,
													footer: true,
												},
										  ]
										: []),
							  ]
							: [];
					} else {
						__options = Types.isArray(loadedOptions)
							? loadedOptions
							: [];
					}

					// 只有成功才會將 loading 註記為 false
					setPickerState((prev) => ({
						...prev,
						loading: false,
					}));
					setOptions(__options);
					setNoOptionsText(noOptionsText);
				} else {
					throw error || "load options failed";
				}
			} catch (err) {
				// 通常是 getOptions 失敗才會跑到這邊
				console.error(`${name}.loadOptions failed`, err);
				handleError(err);
				setPickerState((prev) => ({
					...prev,
					error: {
						message: "unexpected error",
					},
				}));
				setOptions([]);
				setNoOptionsText(fetchErrorText);
			} finally {
				setPickerState((prev) => ({
					...prev,
					loading: false,
				}));
			}
		},
		[
			name,
			onError,
			sendAsync,
			method,
			url,
			queryParam,
			querystring,
			params,
			headers,
			bearer,
			getOptions,
			filterByServer,
			setOptions,
			noOptionsText,
			getTotalRecords,
			fetchErrorText,
		]
	);

	const {
		handleItemsRendered,
		loadMoreItems,
		isItemLoaded,
		itemCount,

		loadList,
		listLoading,
		listError,
		// listItems,
		listData,
		listMapRef,
	} = useInfiniteLoader({
		url: url,
		bearer: bearer,
		initialFetchSize: 50,
	});

	// useEffect(() => {
	// 	setPickerState((prev) => ({
	// 		...prev,
	// 		loading: listLoading,
	// 	}));
	// }, [listLoading]);

	const infiniteProps = useMemo(() => {
		if (!infinite) {
			return null;
		}
		return {
			listMapRef,
			handleItemsRendered,
			loadMoreItems,
			isItemLoaded,
			itemCount,
		};
	}, [
		handleItemsRendered,
		infinite,
		isItemLoaded,
		itemCount,
		listMapRef,
		loadMoreItems,
	]);

	// useEffect(() => {
	// 	if (listData) {
	// 		setOptions(Objects.toArray(listData));
	// 	}
	// }, [listData, setOptions]);

	useChangeTracking(() => {
		if (listLoading != null) {
			setPickerState((prev) => ({
				...prev,
				loading: listLoading,
			}));
		}
	}, [listLoading]);

	useChangeTracking(() => {
		if (listLoading == false && listData && itemCount && !options) {
			const options = Objects.toArray(listData);
			setOptions(options);
		}
	}, [itemCount, listLoading]);

	const fetchOptionsPartially = useCallback(
		async (query) => {
			console.log(`${name}.fetchOptionsPartially(${query || ""})`);
			// setPickerState((prev) => ({
			// 	...prev,
			// 	loading: true,
			// 	error: null,
			// }));
			loadList({
				refresh: true,
				params: {
					// ...(querystring && queryString.parse(querystring)),
					...(query && { [queryParam]: query }),
					// ...params,
				},
			});
		},
		[name, loadList, queryParam]
	);

	const loadOptions = useMemo(() => {
		if (infinite) {
			return fetchOptionsPartially;
		}
		return isMock ? mockFetchOptions : fetchOptions;
	}, [
		fetchOptions,
		fetchOptionsPartially,
		infinite,
		isMock,
		mockFetchOptions,
	]);

	const clearOptions = useCallback(() => {
		setPickerState((prev) => ({
			...prev,
			// options: [],
		}));
		setOptions([]);
		setNoOptionsText(queryRequired ? typeToSearchText : noOptionsText);
	}, [noOptionsText, queryRequired, setOptions, typeToSearchText]);

	const lazyLoadingRef = useRef();

	const resetLoading = useCallback(() => {
		if (!sharedKey) {
			setPickerState((prevState) => ({
				...prevState,
				loading: null,
				query: null,
				// options: [],
			}));
			setOptions([]);
		} else {
			setPickerState((prevState) => ({
				...prevState,
				loading: sharedOptions.hasOptions(sharedKey) ? false : null,
				query: null,
				// options: [],
			}));
		}
	}, [setOptions, sharedKey, sharedOptions]);

	const handleTextChange = useCallback(
		(event, newValue, reason) => {
			const qs = event.target.value;
			console.log(`text changed: `, qs, newValue, reason);
			setPickerState((prev) => ({
				...prev,
				query: qs,
			}));
			// if (disableOpenOnInput) {
			// }

			// if (!popperOpen) {
			// 	if (filterByServer) {
			// 		setPickerState((prev) => ({
			// 			...prev,
			// 			loading: null,
			// 		}));
			// 	}
			// 	return;
			// }

			// 當 filterByServer 時才 loadOptions
			if (filterByServer) {
				if (!popperOpen) {
					setPickerState((prev) => ({
						...prev,
						loading: null,
					}));
					return;
				}
				if (lazyLoadingRef.current) {
					clearTimeout(lazyLoadingRef.current);
				}

				lazyLoadingRef.current = setTimeout(() => {
					loadOptions(qs);
					// if (triggerServerFilter(qs)) {
					// 	loadOptions(qs);
					// } else {
					// 	clearOptions();
					// }
				}, triggerDelay);
			}
		},
		[filterByServer, loadOptions, popperOpen, triggerDelay]
	);

	const disabled = useMemo(() => {
		return (
			disableOnSingleOption &&
			pickerState.options &&
			pickerState.options?.length < 2
		);
	}, [disableOnSingleOption, pickerState.options]);

	/**
	 * 來源條件改變, 清空目前值, resetLoading
	 */
	useChangeTracking(() => {
		if (clearOnChange || clearValueOnChange) {
			// if (debug) {
			console.log(
				`%cOptionPicker[${name}] VALUE CLEARED(clearValueOnChange ON) →`,
				CommonCSS.CONSOLE_WARN
			);
			console.log(
				`\t%c${url}${querystring ? "?" + querystring : ""}${
					params ? `params: ${JSON.stringify(params)}` : ""
				}`,
				CommonCSS.CONSOLE_INFO
			);
			// }
			onChange(multiple ? [] : null);
			// resetLoading();
		}
	}, [url, querystring, params]);

	useChangeTracking(() => {
		if (clearOnChange || clearOptionsOnChange) {
			// if (debug) {
			console.log(
				`%cOptionPicker[${name}] LOADING RESET(clearOptionsOnChange ON) → `,
				CommonCSS.CONSOLE_WARN
			);
			console.log(
				`\t%c${url}${querystring ? "?" + querystring : ""}${
					params ? `params: ${JSON.stringify(params)}` : ""
				}`,
				CommonCSS.CONSOLE_INFO
			);
			// }
			// onChange(multiple ? [] : null);
			resetLoading();
		}
	}, [url, querystring, params]);

	/** filterByServer 時, 關閉 popper 則重設 loading 狀態
	 */
	useChangeTracking(() => {
		if (filterByServer && !infinite && !popperOpen) {
			console.log(
				`%cOptionPicker[${name}] LOADING RESET(filterByServer ON, popper closed)`,
				CommonCSS.CONSOLE_WARN
			);
			resetLoading();
		}
	}, [filterByServer, popperOpen]);

	/**
	 * 展開時 loadOptions
	 */
	useChangeTracking(() => {
		if (debug) {
			console.log(
				`${name}.[shouldLoadOptions] changed:`,
				`${shouldLoadOptions}`
			);
		}
		if (shouldLoadOptions) {
			// loadOptions(queryRequired ? pickerState.query : null);
			loadOptions(pickerState.query);
		}
	}, [shouldLoadOptions]);

	const _findByInput = useMemo(() => {
		if (findByInput != null) {
			if (Types.isFunction(findByInput)) {
				return findByInput;
			} else if (Types.isBoolean(findByInput)) {
				return findByInput ? fetchByInput : null;
			}
		}
		return fetchByInput;
	}, [findByInput, fetchByInput]);

	return {
		shouldLoadOptions,
		loadOptions,
		clearOptions,
		resetLoading,
		...pickerState,
		options: _options,
		noOptionsText: _noOptionsText,
		onTextChange: handleTextChange,
		onChange: handleChange,
		// open,
		// disableClose,
		disabled,
		// pressToFind,
		findByInput: _findByInput,
		open: popperOpen,
		onOpen: handleOpen,
		onClose: handleClose,
		openPopper,
		closePopper,
		disableOpenOnInput,
		multiple,
		name,
		infiniteProps,
		...rest,
	};
};
