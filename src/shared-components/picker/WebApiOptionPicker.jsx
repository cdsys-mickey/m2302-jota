import PropTypes from "prop-types";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useWebApi } from "@/shared-hooks/useWebApi";
import QueryString from "query-string";
import { memo } from "react";
import OptionPicker from "./OptionPicker";
import { createFilterOptions } from "@mui/material";
import { useMemo } from "react";

const noFilterOptions = (options) => {
	return options;
};

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
			queryString,
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
			onError = defaultOnError,
			onClose,
			...rest
		} = props;

		// console.log(`rendering WebApiOptionPicker`);

		const { sendAsync } = useWebApi();

		const [loading, setLoading] = useState(null);

		const [pickerState, setPickerState] = useState({
			// loading: null,
			// query: null,
			options: options,
			open: false,
			noOptionsText: queryRequired ? typeToSearchText : noOptionsText,
		});

		const timerIdRef = useRef();

		const setOpen = useCallback((open) => {
			setPickerState((prevState) => {
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
			if (onClose) {
				onClose();
			}
			if (filterByServer) {
				setPickerState((prev) => ({
					...prev,
					open: false,
				}));
			} else {
				setPickerState((prev) => ({
					...prev,
					open: false,
					// ...(prev.error && {
					// 	loading: null,
					// }),
				}));
			}
		}, [filterByServer, onClose]);

		const loadOptions = useCallback(
			async ({ q, onError: onMethodError } = {}) => {
				// 若有指定 options 則不 fetch
				// if (options) {
				// 	console.log("option provided, no fetching needed");
				// 	setPickerState((prev) => ({
				// 		...prev,
				// 		options: options,
				// 	}));
				// 	return;
				// }

				console.log(`${name}.loadOptions(${q})`);
				// 每次找之前回復 noOptionsText
				setLoading(true);
				setPickerState((prev) => ({
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
							...(queryString && QueryString.parse(queryString)),
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
					console.error(`${name}.loadOptions failed`);
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
				queryString,
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
				...(queryRequired && {
					noOptionsText: typeToSearchText,
				}),
			}));
		}, [queryRequired, typeToSearchText]);

		const handleInputChange = useCallback(
			(event) => {
				let qs = event.target.value;
				console.log(`text changed: `, qs);

				if (timerIdRef.current) {
					clearTimeout(timerIdRef.current);
				}
				timerIdRef.current = setTimeout(() => {
					if (filterByServer) {
						console.log("filterByServer");
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
		// 		setPickerState((prevState) => ({
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
				// ((!multiple && value === "") ||
				((!multiple && !value) ||
					(multiple && Array.isArray(value) && value.length === 0))
			) {
				setPickerState((prevState) => ({
					...prevState,
					options: [],
					noOptionsText: typeToSearchText,
				}));
				setLoading(null);
			}
			if (onChange) {
				onChange(value);
			}
		};

		// 當 filterByServer 時, 不會對輸出做任何篩選
		// 參考 https://github.com/mui/material-ui/blob/master/packages/mui-base/src/useAutocomplete/useAutocomplete.js
		const filterOptions = useMemo(() => {
			return filterByServer ? noFilterOptions : createFilterOptions();
		}, [filterByServer]);

		/**
		 * 何時清除 options?
		 * 1.FilterMode.SERVER
		 * 2.pickerState.open == false
		 * 則
		 * loading === NONE
		 * query
		 */
		useEffect(() => {
			if (filterByServer && !pickerState.open) {
				setPickerState((prevState) => ({
					...prevState,
					// loading: null,
					options: [],
				}));
				setLoading(null);
			}
		}, [filterByServer, pickerState.open]);

		/**
		 * 空白展開時 fetch options
		 */
		useEffect(() => {
			if (
				url &&
				pickerState.open &&
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
			pickerState.open,
			pickerState.error,
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

			setLoading(null);
		}, [name, onChange, queryString, url]);

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
				multiple={multiple}
				ref={ref}
				loading={loading}
				{...pickerState}
				disabled={disabled}
				// ChipProps={chipProps}
				onOpen={handleOpen}
				onClose={handleClose}
				onChange={handleChange}
				onInputChange={handleInputChange}
				filterOptions={filterOptions}
				// noOptionsText={noOptionsText}
				{...rest}
			/>
		);
	})
);

WebApiOptionPicker.displayName = "WebApiOptionPicker";

WebApiOptionPicker.propTypes = {
	name: PropTypes.string,
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
	queryString: PropTypes.string,
	headers: PropTypes.object,
	disabled: PropTypes.bool,
	typeToSearchText: PropTypes.string,
	noOptionsText: PropTypes.string,
	fetchErrorText: PropTypes.string,
	triggerDelay: PropTypes.number,
	options: PropTypes.array,
	triggerServerFilter: PropTypes.func,
	getData: PropTypes.func,
	onError: PropTypes.func,
	onClose: PropTypes.func,
};

export default WebApiOptionPicker;
