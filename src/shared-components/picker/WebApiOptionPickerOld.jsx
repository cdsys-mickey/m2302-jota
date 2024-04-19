import { useWebApi } from "@/shared-hooks/useWebApi";

import PropTypes from "prop-types";
import queryString from "query-string";
import {
	forwardRef,
	memo,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import OptionPicker from "./OptionPicker";

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

const WebApiOptionPickerOld = memo(
	forwardRef((props, ref) => {
		console.log("rendering WebApiOptionPickerOld");
		const {
			name = "NO_NAME",
			onChange,
			multiple = false,
			filterByServer = false,
			// HTTP
			url,
			bearer,
			method = "get",
			lazy = true,
			queryParam = "q",
			// queryRequired = false,
			querystring,
			headers,
			disabled = false,
			typeToSearchText = "請輸入關鍵字進行搜尋",
			noOptionsText = "無可用選項",
			fetchErrorText = "讀取失敗",
			triggerDelay = 700,
			defaultOptions = [],
			// fullWidth = false,

			// METHODS
			triggerServerFilter = defaultTriggerServerFilter, // 是否驅動遠端搜尋
			getData = defaultGetData,
			onError = defaultOnError,
			onOpen,
			onClose,
			...rest
		} = props;

		// console.log("rendering WebApiOptionPickerOld");

		const { sendAsync } = useWebApi();

		// const [loading, setLoading] = useState(null);

		const [open, setOpen] = useState(false);

		const [pickerState, setPickerState] = useState({
			loading: null,
			// query: null,
			options: defaultOptions,
			// open: false,
			noOptionsText: filterByServer ? typeToSearchText : noOptionsText,
		});

		const timerIdRef = useRef();

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
			setOpen(false);
		}, [onClose]);

		const loadOptions = useCallback(
			async ({ q, onError: onMethodError } = {}) => {
				console.log(`${name}.loadOptions(${q})`);
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
					// setLoading(false);
					setPickerState((prev) => ({
						...prev,
						loading: false,
					}));
				}
			},
			[
				name,
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

		const handleInputChange = useCallback(
			(event) => {
				let qs = event.target.value;
				// console.log(`text changed: `, qs);

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
		const handleChange = (value) => {
			if (
				filterByServer &&
				((!multiple && !value) ||
					(multiple && Array.isArray(value) && value.length === 0))
			) {
				setPickerState((prevState) => ({
					...prevState,
					options: [],
					noOptionsText: typeToSearchText,
					loading: null,
				}));
			}
			if (onChange) {
				onChange(value);
			}
		};

		// 當 filterByServer 時, 不會對輸出做任何篩選

		/**
		 * 何時清除 options?
		 * 1.FilterMode.SERVER + queryRequired
		 * 2.pickerState.open === false
		 * 則
		 * loading === NONE
		 * query
		 */
		useEffect(() => {
			if (filterByServer && !open) {
				setPickerState((prevState) => ({
					...prevState,
					loading: null,
					options: [],
				}));
			}
		}, [filterByServer, open]);

		/**
		 * 空白展開時 fetch options
		 */
		useEffect(() => {
			if (
				url &&
				open &&
				!filterByServer &&
				lazy &&
				(pickerState.loading === null ||
					pickerState.loading === undefined) &&
				!disabled
			) {
				console.log(`loadOptions: loading: ${pickerState.loading}`);
				loadOptions();
			}
		}, [
			disabled,
			lazy,
			loadOptions,
			filterByServer,
			pickerState.loading,
			open,
			pickerState.error,
			url,
		]);

		// 當網址清空時, 重設 options, 退回到 loading = null 狀態
		useEffect(() => {
			if (!url) {
				if (onChange) {
					onChange(null, null);
				}
			}
			setPickerState((prev) => ({
				...prev,
				loading: null,
			}));
		}, [name, onChange, querystring, url]);

		return (
			<OptionPicker
				name={name}
				multiple={multiple}
				ref={ref}
				{...pickerState}
				disabled={disabled}
				open={open}
				onOpen={handleOpen}
				onClose={handleClose}
				onChange={handleChange}
				onInputChange={handleInputChange}
				{...rest}
			/>
		);
	})
);

WebApiOptionPickerOld.displayName = "WebApiOptionPickerOld";

WebApiOptionPickerOld.propTypes = {
	// 來自 OptionPicker
	disabled: PropTypes.bool,

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
	querystring: PropTypes.string,
	headers: PropTypes.object,
	typeToSearchText: PropTypes.string,
	noOptionsText: PropTypes.string,
	fetchErrorText: PropTypes.string,
	triggerDelay: PropTypes.number,
	defaultOptions: PropTypes.array,
	triggerServerFilter: PropTypes.func,
	getData: PropTypes.func,
	onError: PropTypes.func,
	onClose: PropTypes.func,
	onOpen: PropTypes.func,
};

export default WebApiOptionPickerOld;
