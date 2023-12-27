import PropTypes from "prop-types";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useWebApi } from "@/shared-hooks/useWebApi";
import queryString from "query-string";
import { memo } from "react";
import OptionPicker from "./OptionPicker";

const defaultTriggerServerFilter = (q) => {
	return !!q;
};

const defaultGetData = (payload) => {
	return payload["data"];
	// return payload;
};

const WebApiOptionPicker = memo(
	forwardRef((props, ref) => {
		const {
			name = "NO_NAME",
			// variant = "outlined",
			// value,
			onChange,
			multiple = false,
			// ChipProps,
			// filterSelectedOptions,
			// disableCloseOnSelect,
			filterByServer = false,
			// TextFieldProps,
			// placeholder,
			// inputRef,
			//http
			url,
			method = "get",
			lazy = true,
			queryParam = "q",
			queryRequired = false,
			// paramsJson, //為了要讓參數被異動偵測機制判定為有異動，必須將參數序列化為 json 字串再傳進來
			parameters,
			headers,
			//
			// label,
			// 提供給 Input(mui) 的屬性
			// InputProps,
			// 提供給 input(html) 的屬性
			// inputProps,
			// InputLabelProps,
			// required,
			// error,
			// helperText,
			disabled = false,
			// filterOptions,
			// sortBy,
			// filterBy,
			// focusedBackgroundColor = "#b6f0ff",
			// debug 用
			// dontClose = false,
			// dnd = false,
			// size,
			typeToSearchText = "請輸入關鍵字進行搜尋",
			noOptionsText = "無可用選項",
			fetchErrorText = "讀取失敗",
			triggerDelay = 700,
			options = [],
			// fullWidth = false,
			// HTTP
			bearer,
			// METHODS
			triggerServerFilter = defaultTriggerServerFilter, // 是否驅動遠端搜尋
			getData = defaultGetData,
			...rest
		} = props;

		const { sendAsync } = useWebApi();

		const [loading, setLoading] = useState(null);

		const [state, setState] = useState({
			// loading: null,
			// query: null,
			options: options,
			open: false,
			noOptionsText: noOptionsText,
		});

		const timerIdRef = useRef();

		const setOpen = useCallback((open) => {
			setState((prevState) => {
				return {
					...prevState,
					open,
				};
			});
		}, []);

		const handleOpen = useCallback(() => {
			// console.log(`${name}.handleOpen`);
			setOpen(true);
		}, [setOpen]);

		const handleClose = useCallback(() => {
			// console.log(`${name}.handleClose`);
			if (filterByServer) {
				setState((prev) => ({
					...prev,
					open: false,
				}));
			} else {
				setState((prev) => ({
					...prev,
					open: false,
					// ...(prev.error && {
					// 	loading: null,
					// }),
				}));
			}
		}, [filterByServer]);

		const loadOptions = useCallback(
			async ({ q } = {}) => {
				// 若有指定 options 則不 fetch
				// if (options) {
				// 	console.log("option provided, no fetching needed");
				// 	setState((prev) => ({
				// 		...prev,
				// 		options: options,
				// 	}));
				// 	return;
				// }

				console.log(`${name}.loadOptions(${q})`);
				// 每次找之前回復 noOptionsText
				setLoading(true);
				setState((prev) => ({
					...prev,
					// query: q,
					// loading: true,
					noOptionsText: typeToSearchText,
				}));
				try {
					const { status, payload, error } = await sendAsync({
						method,
						url,
						data: {
							...(q && { [queryParam]: q }),
							...(parameters && queryString.parse(parameters)),
						},
						headers,
						...(bearer && {
							bearer,
						}),
					});
					if (status.success) {
						setState((prev) => ({
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
					console.error(`${name}.loadOptions failed`, err);
					setState((prev) => ({
						...prev,
						options: [],
						// loading: false,
						error: {
							message: "unexpected error",
						},
						noOptionsText: fetchErrorText,
					}));
				} finally {
					setLoading(false);
				}
			},
			[
				name,
				typeToSearchText,
				sendAsync,
				method,
				url,
				queryParam,
				parameters,
				headers,
				bearer,
				getData,
				noOptionsText,
				fetchErrorText,
			]
		);

		const handleTextFieldChange = useCallback(
			(event) => {
				let query = event.target.value;

				// if (timerIdRef.current) {
				// 	clearTimeout(timerIdRef.current);
				// }
				// timerIdRef.current = setTimeout(() => {
				// 	if (query) {
				// 		if (filterByServer && triggerServerFilter(query)) {
				// 			loadOptions({ q: query });
				// 		}
				// 	} else {
				// 		if (filterByServer && queryRequired) {
				// 			setState((prevState) => ({
				// 				...prevState,
				// 				options: [],
				// 				// loading: null,
				// 				noOptionsText:
				// 					typeToSearchText || noOptionsText,
				// 			}));
				// 			setLoading(null);
				// 		}
				// 	}
				// }, triggerDelay);
				if (timerIdRef.current) {
					clearTimeout(timerIdRef.current);
				}
				timerIdRef.current = setTimeout(() => {
					if (filterByServer) {
						if (query) {
							if (triggerServerFilter(query)) {
								loadOptions({ q: query });
							}
						} else {
							loadOptions();
						}
					}
				}, triggerDelay);
				setState((prev) => ({
					...prev,
					query,
				}));
			},
			[filterByServer, loadOptions, triggerDelay, triggerServerFilter]
		);

		/**
		 * 當選定值改變時(增加或減少), 若 filterMode 是 SERVER
		 * @param {*} event
		 * @param {*} value
		 */
		// const handleChange = (event, value, reason) => {
		// 	console.log(`${name}.event`, event);
		// 	console.log(`${name}.value`, value);
		// 	console.log(`${name}.reason`, reason);
		// 	// clear options when input is empty
		// 	if (
		// 		queryRequired &&
		// 		((!multiple && value === "") ||
		// 			(multiple && Array.isArray(value) && value.length === 0))
		// 	) {
		// 		// clearOptions();
		// 		setState((prevState) => ({
		// 			...prevState,
		// 			options: [],
		// 			// loading: null,
		// 		}));
		// 		setLoading(null);
		// 	}
		// 	if (onChange) {
		// 		onChange(value);
		// 	}
		// };
		const handleChange = (value) => {
			if (
				queryRequired &&
				((!multiple && value === "") ||
					(multiple && Array.isArray(value) && value.length === 0))
			) {
				// clearOptions();
				setState((prevState) => ({
					...prevState,
					options: [],
					// loading: null,
				}));
				setLoading(null);
			}
			if (onChange) {
				onChange(value);
			}
		};

		/**
		 * 何時清除 options?
		 * 1.FilterMode.SERVER
		 * 2.state.open == false
		 * 則
		 * loading === NONE
		 * query
		 */
		useEffect(() => {
			if (filterByServer && !state.open) {
				setState((prevState) => ({
					...prevState,
					// loading: null,
					options: [],
				}));
				setLoading(null);
			}
		}, [filterByServer, state.open]);

		/**
		 * 空白展開時 fetch options
		 */
		useEffect(() => {
			if (
				url &&
				state.open &&
				!queryRequired &&
				lazy &&
				loading === null &&
				!disabled
			) {
				console.log("load full options for the first time");
				loadOptions();
			}
		}, [
			disabled,
			lazy,
			loadOptions,
			queryRequired,
			loading,
			state.open,
			state.error,
			url,
		]);

		// 當網址清空時, 重設 options, 退回到 loading = null 狀態
		useEffect(() => {
			if (!url) {
				if (onChange) {
					onChange(null, null);
				}
			} else {
				// console.log(`url set to ${url}`);
			}
			// console.log(`${name}.options cleared, due to url/qs changed`);
			// console.log(`\turl`, url);
			// console.log(`\tparameters`, parameters);
			// setState((prev) => ({
			// 	...prev,
			// 	options: [],
			// }));
			setLoading(null);
		}, [name, onChange, parameters, url]);

		// useEffect(() => {
		// 	if (options && url) {
		// 		console.error("options 與 url 不可同時指定");
		// 	}
		// 	if (!options && !url) {
		// 		console.error("options 與 url 必須指定其一");
		// 	}
		// }, [options, url]);

		return (
			<OptionPicker
				name={name}
				ref={ref}
				loading={loading}
				{...state}
				disabled={disabled}
				// ChipProps={chipProps}
				onOpen={handleOpen}
				onClose={handleClose}
				onChange={handleChange}
				onInputChange={handleTextFieldChange}
				// noOptionsText={noOptionsText}
				{...rest}
			/>
		);
	})
);

WebApiOptionPicker.displayName = "WebApiOptionPicker";

WebApiOptionPicker.propTypes = {
	name: PropTypes.string,
	value: PropTypes.object,
	bearer: PropTypes.string,
	// METHODS
	onChange: PropTypes.func,
	multiple: PropTypes.bool,
	ChipProps: PropTypes.object,
	filterByServer: PropTypes.bool,
	url: PropTypes.string,
	method: PropTypes.oneOf(["get", "post"]),
	lazy: PropTypes.bool,
	queryParam: PropTypes.string,
	queryRequired: PropTypes.bool,
	parameters: PropTypes.string,
	headers: PropTypes.object,
	disabled: PropTypes.bool,
	typeToSearchText: PropTypes.string,
	noOptionsText: PropTypes.string,
	fetchErrorText: PropTypes.string,
	triggerDelay: PropTypes.number,
	options: PropTypes.array,
	triggerServerFilter: PropTypes.func,
	getData: PropTypes.func,
};

export default WebApiOptionPicker;
