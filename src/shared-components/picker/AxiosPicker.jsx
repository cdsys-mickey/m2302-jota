// Material-UI Core
import {
	Autocomplete,
	Box,
	Chip,
	styled,
	Paper,
	TextField,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import LoadingState from "@/shared-constants/loading-states";
import useLoaded from "@/shared-hooks/useLoaded";

export const FilterMode = Object.freeze({
	CLIENT: Symbol("CLIENT"),
	SERVER: Symbol("SERVER"),
});

const AxiosPickerPaper = (props) => {
	const { elevation = 8, ...rest } = props;
	return <Paper elevation={elevation} {...rest} />;
};

const PickerBox = styled(Box, {
	shouldForwardProp: (prop) =>
		!["focusedBackgroundColor", "size"].includes(prop),
})(({ theme, focusedBackgroundColor, size }) => ({
	"& .MuiAutocomplete-groupLabel": {
		backgroundColor: theme.palette.primary.main,
		...(size === "small" && {
			lineHeight: "30px",
		}),
	},
	"& .MuiAutocomplete-option[data-focus=true]": {
		backgroundColor: focusedBackgroundColor || "#b6f0ff",
	},
	"& ::-webkit-scrollbar": {
		width: "8px",
		borderRadius: theme.spacing(0.5),
		backgroundColor: "rgba(0, 0, 0, .03)",
	},
	"& ::-webkit-scrollbar-thumb": {
		borderRadius: theme.spacing(0.5),
		backgroundColor: "rgba(0, 0, 0, .2)",
	},
	width: "100%",
}));

/**
 *
 * @param {} options
 */
const AxiosPicker = React.forwardRef((props, ref) => {
	const {
		name,
		disablePortal = true,
		variant,
		noOptionsText = "無可用選項",
		typeToSearchText = "請輸入關鍵字進行搜尋",
		clearText = "清除",
		closeText = "收和",
		openText = "展開",
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
		loadingText = "讀取中...",
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
		focusedBackgroundColor = "#b6f0ff",
		// debug 用
		dontClose = false,
		dnd = true,
		size,
		...rest
	} = props;

	const triggerDelay = 700;

	const [loaded, setLoaded] = useLoaded();
	const [noOptionsTextValue, setNoOptionsTextValue] = useState(noOptionsText);

	const [state, setState] = useState({
		loading: null,
		query: null,
		options: [],
		open: false,
		paramsObj: paramsJson ? JSON.parse(paramsJson) : null,
	});

	const setOpen = (open) => {
		setState((prevState) => {
			return {
				...prevState,
				open,
			};
		});
	};

	let timerId;
	let query;

	const handleTextFieldChange = (event) => {
		query = event.target.value;
		console.debug(`"${query}"`, "handleTextFieldChange");

		clearTimeout(timerId);
		timerId = setTimeout(() => {
			console.debug(
				`input changed: ${query}, filterMode: ${filterMode?.toString()}`
			);

			if (query) {
				// setNoOptionsTextValue("無可用選項");
				if (filterMode === FilterMode.SERVER) {
					loadOptions(query);
				}
			} else {
				setNoOptionsTextValue("請輸入關鍵字進行搜尋");
				// 若搜尋字串清空+SERVER 模式+queryRequired時, 就清空所有選項
				if (filterMode === FilterMode.SERVER && queryRequired) {
					// clearOptions();
					setState((prevState) => ({
						...prevState,
						options: [],
						loading: null,
					}));
				}
			}
		}, triggerDelay);
	};

	/**
	 * 當選定值改變時(增加或減少), 若 filterMode 是 SERVER
	 * @param {*} event
	 * @param {*} value
	 */
	const handleAutocompleteChange = (event, value) => {
		console.debug(value, "handleAutocompleteChange");
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

	const handleClose = () => {
		// 若要需要有查詢字串才會發出 api call, 則在關閉時清除選項
		if (filterMode === FilterMode.SERVER && queryRequired) {
			setState((prevState) => ({
				...prevState,
				options: [],
				loading: null,
			}));
		}
		if (!dontClose) setOpen(false);
	};

	// const handleClose = () => {};

	/**
	 * 如果正在查詢的時候被打斷要如何處理
	 */
	const loadOptions = useCallback(
		(q) => {
			console.debug(
				`loadOptions(${queryParam}: ${q}, params: ${state.paramsObj})`
			);

			setState((prevState) => ({
				...prevState,
				query: q,
				loading: LoadingState.LOADING,
			}));
			axios({
				method: method,
				url: url,
				data:
					method !== "get"
						? {
								...state.paramsObj,
								[queryParam]: q,
						  }
						: null,
				params:
					method === "get"
						? {
								...state.paramsObj,
								[queryParam]: q,
						  }
						: null,
				headers: headers,
			})
				.then((axiosResponse) => {
					console.debug("axiosResponse", axiosResponse);
					if (2 === Math.floor(axiosResponse.status / 100)) {
						let payload = axiosResponse.data || [];
						if (filterBy) {
							payload = payload.filter(filterBy);
						}
						if (sortBy) {
							payload = payload.sort(sortBy);
						}
						if (payload.length === 0) {
							setNoOptionsTextValue(noOptionsText);
						}
						setState((prevState) => ({
							...prevState,
							options: payload,
							loading: LoadingState.DONE,
						}));
					} else {
						setState((prevState) => {
							return {
								...prevState,
								options: [],
								loading: LoadingState.FAILED,
							};
						});
					}
				})
				.catch((error) => {
					console.warn(error);
					setState({
						...state,
						options: [],
						loading: LoadingState.FAILED,
					});
					setNoOptionsTextValue(error?.message || "讀取失敗");
				});
		},
		[
			queryParam,
			state,
			method,
			url,
			headers,
			filterBy,
			sortBy,
			noOptionsText,
		]
	);

	const renderNormalInput = (textFieldProps) => (
		<TextField
			required={required}
			label={label}
			fullWidth
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

	const renderDndInput = (textFieldProps) => (
		<Droppable droppableId={name} direction="horizontal">
			{(provided, snapshot) => (
				<div {...provided.droppableProps} ref={provided.innerRef}>
					{renderNormalInput(textFieldProps)}
					{/* <TextField
							required={required}
							label={label}
							fullWidth
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
						/> */}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);

	const renderInput = (textFieldProps) => {
		if (!dnd) {
			return renderNormalInput(textFieldProps);
		}
		return renderDndInput(textFieldProps);
	};
	const renderNormalTags = useCallback((value) => {
		return value?.map((o, index) => (
			<Chip label={o} size="small" color="primary" />
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
				return renderDndTags(value, getCustomizedTagProps, ownerState);
			} else {
				return renderNormalTags(value);
			}
		},
		[dnd, renderDndTags, renderNormalTags]
	);

	// 若為多選
	let filterSelectedOptionsValue = false;
	// let disableCloseOnSelectValue = false;
	let chipPropsValue = ChipProps;
	if (multiple) {
		if (!ChipProps) {
			chipPropsValue = {
				color: "primary",
				size: "small",
			};
		}
		// 將已選取選項自候選清單中移除
		if (filterSelectedOptions === undefined) {
			filterSelectedOptionsValue = true;
		}
		// 選完不關閉候選清單
		// if (disableCloseOnSelect === undefined) {
		// 	disableCloseOnSelectValue = true;
		// }
	}

	useEffect(() => {
		if (!loaded) {
			setLoaded();
			if (filterMode === FilterMode.SERVER && queryRequired) {
				setNoOptionsTextValue(typeToSearchText);
			} else {
				setNoOptionsTextValue(noOptionsText);
			}
		}
	}, [
		filterMode,
		loaded,
		noOptionsText,
		queryRequired,
		setLoaded,
		typeToSearchText,
	]);

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
	 * 何時觸發查詢 loadOptions() 帶出尚未輸入 query 時的 options
	 * 1.選單開
	 * 2.查詢參數非必要
	 * 3.非 lazy
	 * 4.非 disabled
	 */
	useEffect(() => {
		if (
			state.open &&
			!queryRequired &&
			lazy &&
			!state.loading &&
			!disabled
		) {
			console.debug("load full options for the first time, http");
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
	]);

	/**
	 * 為了要讓參數被異動偵測機制判定為有異動，必須將參數序列化再傳進來
	 */
	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			loading: null,
			options: [],
			paramsObj: paramsJson ? JSON.parse(paramsJson) : null,
		}));
	}, [url, paramsJson]);

	return (
		<PickerBox focusedBackgroundColor={focusedBackgroundColor} size={size}>
			<Autocomplete
				ref={ref}
				size={size}
				PaperComponent={AxiosPickerPaper}
				disabled={disabled}
				disablePortal={disablePortal}
				noOptionsText={noOptionsTextValue}
				clearText={clearText}
				closeText={closeText}
				openText={openText}
				multiple={multiple}
				ChipProps={chipPropsValue}
				filterSelectedOptions={filterSelectedOptionsValue}
				// disableCloseOnSelect={disableCloseOnSelectValue}
				loading={state.loading === LoadingState.LOADING}
				loadingText={loadingText}
				options={state.options}
				open={state.open}
				onOpen={() => {
					setOpen(true);
				}}
				onClose={handleClose}
				value={value}
				onChange={handleAutocompleteChange}
				renderTags={renderTags}
				renderInput={renderInput}
				{...rest}
			/>
		</PickerBox>
	);
});
export default React.memo(AxiosPicker);
