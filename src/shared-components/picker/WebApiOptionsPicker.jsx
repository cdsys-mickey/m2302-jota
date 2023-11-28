import PropTypes from "prop-types";
import { Chip, TextField } from "@mui/material";
import React, {
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import MuiInputs from "@/shared-modules/mui-inputs";
import { FilterMode } from "@/shared-modules/option-pickers";
import OptionsPicker from "./OptionsPicker";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { memo } from "react";

const WebApiOptionsPicker = memo(
	forwardRef((props, ref) => {
		const {
			name,
			variant = "outlined",
			value,
			onChange,
			multiple = false,
			ChipProps,
			filterSelectedOptions,
			disableCloseOnSelect,
			filterMode = FilterMode.CLIENT,
			TextFieldProps,
			placeholder,
			inputRef,
			//http
			url,
			method = "get",
			lazy = true,
			queryParam = "q",
			queryRequired = false,
			paramsJson,
			headers,
			//
			label,
			// 提供給 Input(mui) 的屬性
			InputProps,
			// 提供給 input(html) 的屬性
			inputProps,
			InputLabelProps,
			required,
			error,
			helperText,
			disabled = false,
			filterOptions,
			sortBy,
			filterBy,
			// focusedBackgroundColor = "#b6f0ff",
			// debug 用
			// dontClose = false,
			dnd = false,
			size,
			typeToSearchText = "請輸入關鍵字進行搜尋",
			noOptionsText = "無可用選項",
			fetchErrorText = "讀取失敗",
			triggerDelay = 700,
			options = [],
			fullWidth = false,
			...rest
		} = props;

		const { sendAsync } = useWebApi();

		const chipProps = useMemo(() => {
			if (multiple && !ChipProps) {
				return MuiInputs.DEFAULT_MULTIPLE_OPTIONS_CHIP_PROPS;
			}
			return ChipProps;
		}, [ChipProps, multiple]);

		const [state, setState] = useState({
			loading: null,
			// query: null,
			options: options,
			open: false,
			noOptionsText: noOptionsText,
			// paramsObj: paramsJson ? JSON.parse(paramsJson) : null,
			// timerId: null,
		});

		const timerIdRef = useRef();

		const paramsObj = useMemo(() => {
			return paramsJson ? JSON.parse(paramsJson) : null;
		}, [paramsJson]);

		const setOpen = useCallback((open) => {
			setState((prevState) => {
				return {
					...prevState,
					open,
				};
			});
		}, []);

		const handleOpen = useCallback(() => {
			console.debug("handleOpen");
			setOpen(true);
		}, [setOpen]);

		const handleClose = useCallback(() => {
			console.debug("handleClose");
			// if (filterMode === FilterMode.SERVER && queryRequired) {
			// 	setState((prevState) => ({
			// 		...prevState,
			// 		options: [],
			// 		loading: null,
			// 	}));
			// }
			// 若有錯誤則清空 loading, 下次再開啟時還會嘗試讀取
			if (filterMode === FilterMode.CLIENT) {
				setState((prev) => ({
					...prev,
					open: false,
					...(prev.error && {
						loading: null,
					}),
				}));
			} else {
				setState((prev) => ({
					...prev,
					open: false,
				}));
			}

			// if (!dontClose) {
			// 	setOpen(false);
			// }
		}, [filterMode]);

		const loadOptions = useCallback(
			async (q, noOptionsText) => {
				// 若有指定 options 則不 fetch
				if (options) {
					setState((prev) => ({
						...prev,
						options: options,
					}));
					return;
				}

				console.log(`loadOptions(${q})`);
				setState((prev) => ({
					...prev,
					// query: q,
					loading: true,
					...(noOptionsText && { noOptionsText: noOptionsText }),
				}));
				try {
					const { status, payload, error } = await sendAsync({
						method,
						url,
						data: {
							...paramsObj,
							[queryParam]: q,
						},
						headers,
					});
					setState((prev) => ({
						...prev,
						loading: false,
						options: status.success ? payload : [],
						error: error,
						noOptionsText: fetchErrorText,
					}));
				} catch (err) {
					// 正常情況不該跑到這裡
					console.error(err);
					setState((prev) => ({
						...prev,
						options: [],
						loading: false,
						error: {
							message: "unexpected error",
						},
						noOptionsText: fetchErrorText,
					}));
				}
			},
			[
				options,
				sendAsync,
				method,
				url,
				paramsObj,
				queryParam,
				headers,
				fetchErrorText,
			]
		);

		const handleTextFieldChange = useCallback(
			(event) => {
				let query = event.target.value;
				// console.debug(`"handleTextFieldChange -> ${query}"`, "");

				if (timerIdRef.current) {
					clearTimeout(timerIdRef.current);
				}
				timerIdRef.current = setTimeout(() => {
					// console.debug(
					// 	`input changed: ${query}, filterMode: ${filterMode?.toString()}`
					// );

					if (query) {
						// setNoOptionsTextValue("無可用選項");
						if (filterMode === FilterMode.SERVER) {
							loadOptions(query, noOptionsText);
						}
					} else {
						// setNoOptionsTextValue("請輸入關鍵字進行搜尋");
						// 若搜尋字串清空+SERVER 模式+queryRequired時, 就清空所有選項
						if (filterMode === FilterMode.SERVER && queryRequired) {
							// clearOptions();
							setState((prevState) => ({
								...prevState,
								options: [],
								loading: null,
								noOptionsText:
									typeToSearchText || noOptionsText,
							}));
						}
					}
				}, triggerDelay);
				setState((prev) => ({
					...prev,
					query,
				}));
			},
			[
				filterMode,
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
		const handleChange = (event, value) => {
			console.debug(value, "handleChange");
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
					loading: null,
				}));
			}
			if (onChange) {
				onChange(event, value);
			}
		};

		const renderNormalInput = useCallback(
			(textFieldProps) => {
				// console.log("textFieldProps", textFieldProps);

				return (
					<TextField
						required={required}
						label={label}
						size={size}
						fullWidth={fullWidth}
						error={error}
						helperText={helperText}
						inputRef={inputRef}
						variant={variant}
						onChange={handleTextFieldChange}
						disabled={disabled}
						{...textFieldProps}
						InputProps={{
							...textFieldProps.InputProps,
							// textFieldProps 會帶入他的 override, 所以我們的修改必須放在他之後
							...InputProps,
						}}
						inputProps={{
							...textFieldProps.inputProps,
							// textFieldProps 會帶入他的 override, 所以我們的修改必須放在他之後
							...inputProps,
						}}
						InputLabelProps={{
							...textFieldProps.InputLabelProps,
							...InputLabelProps,
						}}
						placeholder={placeholder}
						{...TextFieldProps}
					/>
				);
			},
			[
				InputLabelProps,
				InputProps,
				TextFieldProps,
				disabled,
				error,
				fullWidth,
				handleTextFieldChange,
				helperText,
				inputProps,
				inputRef,
				label,
				placeholder,
				required,
				size,
				variant,
			]
		);

		const renderDndInput = useCallback(
			(textFieldProps) => (
				<Droppable droppableId={name} direction="horizontal">
					{(provided, snapshot) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}>
							{renderNormalInput(textFieldProps)}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			),
			[name, renderNormalInput]
		);

		const renderInput = useCallback(
			(textFieldProps) => {
				if (!dnd) {
					return renderNormalInput(textFieldProps);
				}
				return renderDndInput(textFieldProps);
			},
			[dnd, renderDndInput, renderNormalInput]
		);

		// const memoizedInput = useMemo(() => {
		// 	if (!dnd) {
		// 		return renderNormalInput(textFieldProps);
		// 	}
		// 	return renderDndInput(textFieldProps);
		// }, [])

		// const memoRenderInput = useMemo(() => {
		// 	return (textFieldProps) => {
		// 		return renderInput(textFieldProps);
		// 	};
		// }, [renderInput]);

		const renderNormalTags = useCallback((value) => {
			return value?.map((o, index) => (
				<Chip key={o} label={o} size="small" color="primary" />
			));
		}, []);

		const renderDndTags = useCallback(
			(value, getCustomizedTagProps, ownerState) => {
				// console.debug(value, "renderTags");
				return value?.map((o, index) => (
					<Draggable key={o} draggableId={o} index={index}>
						{(provided, snapshot) => (
							<Chip
								label={o}
								size="small"
								color="primary"
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								{...getCustomizedTagProps({ index })}
							/>
							// </div>
						)}
					</Draggable>
				));
			},
			[]
		);

		const renderTags = useCallback(
			(value, getCustomizedTagProps, ownerState) => {
				if (dnd) {
					return renderDndTags(
						value,
						getCustomizedTagProps,
						ownerState
					);
				} else {
					return renderNormalTags(value);
				}
			},
			[dnd, renderDndTags, renderNormalTags]
		);

		/**
		 * 何時清除 options?
		 * 1.FilterMode.SERVER
		 * 2.state.open == false
		 * 則
		 * loading === NONE
		 * query
		 */
		useEffect(() => {
			if (filterMode === FilterMode.SERVER && !state.open) {
				setState((prevState) => ({
					...prevState,
					loading: null,
					options: [],
				}));
			}
		}, [filterMode, state.open]);

		/**
		 * 展開時帶入選項
		 */
		useEffect(() => {
			if (
				state.open &&
				!queryRequired &&
				lazy &&
				state.loading === null &&
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
			state.loading,
			state.open,
			paramsJson,
			state.error,
		]);

		/**
		 * 為了要讓參數被異動偵測機制判定為有異動，必須將參數序列化為 json 字串再傳進來
		 */
		// useEffect(() => {
		// 	setState((prevState) => ({
		// 		...prevState,
		// 		loading: null,
		// 		options: [],
		// 		paramsObj: paramsJson ? JSON.parse(paramsJson) : null,
		// 	}));
		// }, [url, paramsJson]);

		useEffect(() => {
			if (options && url) {
				console.error("options 與 url 不可同時指定");
			}
			if (!options && !url) {
				console.error("options 與 url 必須指定其一");
			}
		}, [options, url]);

		return (
			<OptionsPicker
				ref={ref}
				{...state}
				ChipProps={chipProps}
				onOpen={handleOpen}
				onClose={handleClose}
				onChange={handleChange}
				renderInput={renderInput}
				// renderInput={memoRenderInput}
				renderTags={renderTags}
				// noOptionsText={noOptionsText}
				{...rest}
			/>
		);
	})
);

WebApiOptionsPicker.displayName = "WebApiOptionsPicker";

WebApiOptionsPicker.propTypes = {
	value: PropTypes.object,
};

export default WebApiOptionsPicker;
