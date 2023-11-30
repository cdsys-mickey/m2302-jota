import PropTypes from "prop-types";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useWebApi } from "@/shared-hooks/useWebApi";
import queryString from "query-string";
import { memo } from "react";
import OptionPicker from "./OptionPicker";

const WebApiOptionPicker = memo(
	forwardRef((props, ref) => {
		const {
			name,
			// variant = "outlined",
			// value,
			onChange,
			multiple = false,
			// ChipProps,
			// filterSelectedOptions,
			// disableCloseOnSelect,
			filteredByServer = false,
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
			qs,
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
			console.debug(`${name}.handleOpen`);
			setOpen(true);
		}, [name, setOpen]);

		const handleClose = useCallback(() => {
			console.debug(`${name}.handleClose`);
			if (filteredByServer) {
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
		}, [filteredByServer, name]);

		const defaultGetData = useCallback((payload) => {
			// return payload["data"];
			return payload;
		}, []);

		const loadOptions = useCallback(
			async ({ q, getData = defaultGetData } = {}) => {
				// 若有指定 options 則不 fetch
				// if (options) {
				// 	console.debug("option provided, no fetching needed");
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
					noOptionsText,
				}));
				try {
					const { status, payload, error } = await sendAsync({
						method,
						url,
						data: {
							[queryParam]: q,
							// ...paramsObj,
							...(qs && queryString.parse(qs)),
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
							options: getData(payload),
							// error: error,
							// noOptionsText: fetchErrorText,
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
				defaultGetData,
				name,
				noOptionsText,
				sendAsync,
				method,
				url,
				queryParam,
				qs,
				headers,
				bearer,
				fetchErrorText,
			]
		);

		const handleTextFieldChange = useCallback(
			(event) => {
				let query = event.target.value;

				if (timerIdRef.current) {
					clearTimeout(timerIdRef.current);
				}
				timerIdRef.current = setTimeout(() => {
					if (query) {
						if (filteredByServer) {
							loadOptions({ q: query });
						}
					} else {
						if (filteredByServer && queryRequired) {
							setState((prevState) => ({
								...prevState,
								options: [],
								// loading: null,
								noOptionsText:
									typeToSearchText || noOptionsText,
							}));
							setLoading(null);
						}
					}
				}, triggerDelay);
				setState((prev) => ({
					...prev,
					query,
				}));
			},
			[
				filteredByServer,
				loadOptions,
				noOptionsText,
				queryRequired,
				triggerDelay,
				typeToSearchText,
			]
		);

		/**
		 * 當選定值改變時(增加或減少), 若 filterMode 是 SERVER
		 * @param {*} event
		 * @param {*} value
		 */
		const handleChange = (event, value, reason) => {
			console.debug(`${name}.event`, event);
			// console.debug(`${name}.value`, value);
			console.debug(`${name}.reason`, reason);
			// clear options when input is empty
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
			if (filteredByServer && !state.open) {
				setState((prevState) => ({
					...prevState,
					// loading: null,
					options: [],
				}));
				setLoading(null);
			}
		}, [filteredByServer, state.open]);

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
				console.debug("load full options for the first time");
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
				console.debug(
					`${name}.url set to null, options cleared due to url reset to null`
				);
				setState((prev) => ({
					...prev,
					options: [],
				}));
				if (onChange) {
					onChange(null, null);
				}
			} else {
				// console.debug(`url set to ${url}`);
			}
			// console.debug(`loading reset to null`);
			setLoading(null);
		}, [name, onChange, url]);

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
	filteredByServer: PropTypes.bool,
	url: PropTypes.string,
	method: PropTypes.oneOf(["get", "post"]),
	lazy: PropTypes.bool,
	queryParam: PropTypes.string,
	queryRequired: PropTypes.bool,
	qs: PropTypes.string,
	headers: PropTypes.object,
	disabled: PropTypes.bool,
	typeToSearchText: PropTypes.string,
	noOptionsText: PropTypes.string,
	fetchErrorText: PropTypes.string,
	triggerDelay: PropTypes.number,
	options: PropTypes.array,
};

export default WebApiOptionPicker;
