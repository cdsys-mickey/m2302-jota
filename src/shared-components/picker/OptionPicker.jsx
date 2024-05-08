/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Autocomplete,
	Box,
	Chip,
	Paper,
	TextField,
	createFilterOptions,
	styled,
} from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo, useCallback, useMemo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import MuiStyles from "../../shared-modules/sd-mui-styles";
import RWListboxComponent from "./listbox/RWListboxComponent";

// const LISTBOX_PADDING = 8; // px

// function defaultRenderRow(props) {
// 	// Props from React Window
// 	const { data, index, style } = props;

// 	// Props from Autocomplete-renderOption
// 	const dataSet = data[index];

// 	const componentProps = dataSet[0];
// 	const optionLabel = dataSet[1];

// 	const inlineStyle = {
// 		...style,
// 		top: style.top + LISTBOX_PADDING,
// 	};

// 	if (dataSet.group !== undefined) {
// 		return (
// 			<ListSubheader
// 				key={dataSet.key}
// 				component="div"
// 				style={inlineStyle}>
// 				{dataSet.group}
// 			</ListSubheader>
// 		);
// 	}

// 	return (
// 		<Typography
// 			component="li"
// 			{...componentProps}
// 			noWrap
// 			style={inlineStyle}>
// 			{optionLabel}
// 		</Typography>
// 	);
// }

const noFilterOptions = (options) => {
	return options;
};

const PickerBox = styled(Box, {
	shouldForwardProp: (prop) =>
		![
			"focusedBackgroundColor",
			"size",
			"hideBorders",
			"hidePopupIndicator",
			"disablePointerEvents",
			"fadeOutDisabled",
		].includes(prop),
})(
	({
		theme,
		focusedBackgroundColor,
		size,
		hideBorders,
		hidePopupIndicator,
		width,
		disablePointerEvents,
		fadeOutDisabled,
	}) => ({
		/**
		 * *** DSG adaptive support ****
		 **/
		...(hideBorders && {
			"& fieldset": { border: "none" },
		}),
		...(hidePopupIndicator && {
			"& .MuiAutocomplete-popupIndicator": {
				opacity: 0,
			},
			"& .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon .MuiOutlinedInput-root, & .MuiAutocomplete-hasPopupIcon .MuiOutlinedInput-root, & .MuiAutocomplete-hasClearIcon .MuiOutlinedInput-root":
				{
					paddingRight: 0,
				},
		}),
		...(disablePointerEvents && {
			pointerEvents: "none",
		}),
		...(!fadeOutDisabled && {
			"& .MuiInputBase-input.Mui-disabled": {
				color: "initial",
				// "-webkit-text-fill-color": "initial",
				textFillColor: "initial",
			},
		}),
		// "& .MuiInputBase-input.Mui-disabled": {
		// 	color: "initial",
		// 	"-webkit-text-fill-color": "initial",
		// },
		// others
		"& .MuiAutocomplete-groupLabel": {
			backgroundColor: theme.palette.primary.main,
			...(size === "small" && {
				lineHeight: "30px",
			}),
		},
		"& .MuiAutocomplete-option[data-focus=true]": {
			backgroundColor: focusedBackgroundColor || "#b6f0ff",
		},
		"& .MuiOutlinedInput-root.MuiInputBase-root.MuiInputBase-sizeSmall": {
			// paddingTop: theme.spacing(2),
		},
		"& .MuiInputBase-root .MuiChip-root": {
			marginTop: "4px",
			marginRight: "2px",
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
		...(!width && {
			width: "100%",
		}),
	})
);

const OptionPicker = memo(
	forwardRef((props, ref) => {
		// console.log("redenring OptionPicker");
		const {
			// Global
			onChange,
			dense = false,
			dnd = false,
			size = "small",
			hideBorders = false,
			hidePopupIndicator = false,
			disablePointerEvents = false,
			fadeOutDisabled = false,
			name,
			dontFilterOptions,
			stringify,
			// Autocomplete
			filterSelectedOptions = true,
			options,
			sx = [],
			noOptionsText = "無可用選項",
			// typeToSearchText = "請輸入關鍵字進行搜尋",
			clearText = "清除",
			closeText = "收和",
			openText = "展開",
			TextFieldProps,
			value,
			loading = false,
			loadingText = "讀取中...",
			multiple = false,
			ChipProps,
			getOptionLabel,
			getTitle,
			// 自訂方法
			renderOptionLabel,
			// TextField
			autoFocus,
			placeholder,
			inputRef,
			label,
			fullWidth,
			variant,
			InputProps, // 提供給 Input(mui) 的屬性
			inputProps, // 提供給 input(html) 的屬性
			InputLabelProps,
			required,
			error = false,
			helperText,
			disabled = false,
			onInputChange,
			renderTagLabel,
			getOptionKey,
			labelShrink = false,
			// PickerBox
			width,
			BoxProps,
			focusedBackgroundColor = "#b6f0ff",

			// VIRTUALIZATION
			virtualize,
			// PopperComponent,
			// ListboxComponent,
			// disableListWrap = false,
			renderOption: customRenderOption,
			renderGroup,
			// renderRow = defaultRenderRow,
			optionLabelSize,
			...rest
		} = props;

		if (dense && label) {
			console.warn("dense 模式下強制不顯示 label");
		}

		const chipProps = useMemo(() => {
			return ChipProps || MuiStyles.DEFAULT_MULTIPLE_OPTIONS_CHIP_PROPS;
		}, [ChipProps]);

		// 參考 https://github.com/mui/material-ui/blob/master/packages/mui-base/src/useAutocomplete/useAutocomplete.js
		const filterOptions = useMemo(() => {
			return dontFilterOptions
				? noFilterOptions
				: createFilterOptions({
						stringify,
				  });
		}, [dontFilterOptions, stringify]);

		const renderNormalInput = useCallback(
			(props) => {
				// console.log("textFieldProps", textFieldProps);

				return (
					<TextField
						required={required}
						label={dense ? "" : label}
						size={size}
						fullWidth={fullWidth}
						error={error}
						helperText={helperText}
						inputRef={inputRef}
						variant={variant}
						placeholder={placeholder}
						autoFocus={autoFocus}
						onChange={onInputChange}
						// 在 Autocomplete 層 disabled 就可以
						// disabled={disabled}

						{...props}
						InputProps={{
							...props.InputProps,
							// textFieldProps 會帶入他的 override, 所以我們的修改必須放在他之後
							...InputProps,
						}}
						inputProps={{
							...props.inputProps,
							// textFieldProps 會帶入他的 override, 所以我們的修改必須放在他之後
							// ...(dense && {
							// 	padding: 0,
							// }),
							...inputProps,
						}}
						{...TextFieldProps}
						InputLabelProps={{
							...props.InputLabelProps,
							...InputLabelProps,
							...(labelShrink && { shrink: true }),
						}}
					/>
				);
			},
			[
				InputLabelProps,
				InputProps,
				TextFieldProps,
				autoFocus,
				dense,
				error,
				fullWidth,
				helperText,
				inputProps,
				inputRef,
				label,
				labelShrink,
				onInputChange,
				placeholder,
				required,
				size,
				variant,
			]
		);

		const renderDndInput = useCallback(
			(textFieldProps) => (
				<Droppable droppableId={name} direction="horizontal">
					{/* {(provided, snapshot) => ( */}
					{(provided) => (
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
				return dnd
					? renderDndInput(textFieldProps)
					: renderNormalInput(textFieldProps);
			},
			[dnd, renderDndInput, renderNormalInput]
		);

		const renderNormalTags = useCallback(
			(value, getTagProps) => {
				return value?.map((v, index) => {
					const key = getOptionKey ? getOptionKey(v) : v;
					const label = renderTagLabel
						? renderTagLabel(v)
						: getOptionLabel
						? getOptionLabel(v)
						: v;
					return (
						<Chip
							key={key}
							label={label}
							size="small"
							color="primary"
							{...getTagProps({ index })}
						/>
					);
				});
			},
			[getOptionKey, getOptionLabel, renderTagLabel]
		);

		const renderDndTags = useCallback(
			(value, getTagProps) => {
				return value?.map((v, index) => {
					const key = getOptionKey ? getOptionKey(v) : v;
					const label = renderTagLabel
						? renderTagLabel(v)
						: getOptionLabel
						? getOptionLabel(v)
						: null;
					return (
						<Draggable key={key} draggableId={key} index={index}>
							{/* {(provided, snapshot) => ( */}
							{(provided) => (
								<Chip
									label={label}
									size="small"
									color="primary"
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
									{...getTagProps({ index })}
								/>
								// </div>
							)}
						</Draggable>
					);
				});
			},
			[getOptionKey, getOptionLabel, renderTagLabel]
		);

		const renderTags = useCallback(
			(value, getTagProps, ownerState) => {
				if (dnd) {
					return renderDndTags(value, getTagProps, ownerState);
				} else {
					return renderNormalTags(value, getTagProps, ownerState);
				}
			},
			[dnd, renderDndTags, renderNormalTags]
		);

		// eslint-disable-next-line no-unused-vars
		const handleChange = (event, value, reason) => {
			if (onChange) {
				// console.log(`parent.onChange`, value);
				onChange(value);
			}
		};

		const memoisedTitle = useMemo(() => {
			if (getTitle) {
				return getTitle(value);
			}
			if (multiple) {
				return null;
			}

			return value
				? getOptionLabel
					? getOptionLabel(value)
					: value
				: null;
		}, [getOptionLabel, getTitle, multiple, value]);

		const itemStyle = useMemo(() => {
			switch (optionLabelSize) {
				case "small":
					return {
						fontSize: "8px",
					};
				case "medium":
					return {
						fontSize: "80%",
					};
				default:
					return {};
			}
		}, [optionLabelSize]);

		const defaultGetOptionLabel = useCallback((option) => {
			return option;
		}, []);

		const defaultRenderOption = useCallback(
			(props2, option) => {
				const renderOptionFunc =
					renderOptionLabel ||
					getOptionLabel ||
					defaultGetOptionLabel;

				return (
					<li
						{...props2}
						key={props2.key}
						style={{
							...props2.style,
							...itemStyle,
						}}>
						{renderOptionFunc(option)}
					</li>
				);
			},
			[
				defaultGetOptionLabel,
				getOptionLabel,
				itemStyle,
				renderOptionLabel,
			]
		);

		const renderOptionForVirtualized = useCallback(
			(props, option, state) => {
				const renderOptionFunc = renderOptionLabel || getOptionLabel;
				const label = renderOptionFunc(option);

				let variant;
				if (optionLabelSize === "small") {
					variant = "body2";
				} else if (optionLabelSize === "medium") {
					variant = "body1";
				}
				return [
					{
						...props,
						...(variant && {
							variant: variant,
						}),
					},
					label,
					state.index,
				];
			},
			[getOptionLabel, optionLabelSize, renderOptionLabel]
		);

		const renderGroupForVirtualized = useCallback((params) => {
			return params;
		}, []);

		return (
			<PickerBox
				// DSG 支援屬性
				hideBorders={hideBorders}
				hidePopupIndicator={hidePopupIndicator}
				focusedBackgroundColor={focusedBackgroundColor}
				disablePointerEvents={disablePointerEvents}
				fadeOutDisabled={fadeOutDisabled}
				size={size}
				title={memoisedTitle}
				width={width}
				{...BoxProps}>
				<Autocomplete
					onChange={handleChange}
					ref={ref}
					size={size}
					PaperComponent={({ ...rest }) => (
						<Paper elevation={8} {...rest} />
					)}
					filterSelectedOptions={filterSelectedOptions}
					ChipProps={chipProps}
					disabled={disabled}
					noOptionsText={noOptionsText}
					clearText={clearText}
					closeText={closeText}
					openText={openText}
					multiple={multiple}
					renderInput={renderInput}
					renderTags={renderTags}
					loading={loading}
					loadingText={loadingText}
					value={value}
					{...(virtualize && {
						ListboxComponent: RWListboxComponent,
						disableListWrap: true,
					})}
					options={options}
					getOptionLabel={getOptionLabel}
					renderOption={
						virtualize
							? renderOptionForVirtualized
							: customRenderOption || defaultRenderOption
					}
					renderGroup={
						virtualize ? renderGroupForVirtualized : renderGroup
					}
					filterOptions={filterOptions}
					sx={[
						{
							...(disabled && {
								"&.MuiAutocomplete-root .MuiAutocomplete-popupIndicator":
									{
										// opacity: 0,
										display: "none",
									},
								"&.MuiAutocomplete-root .MuiInputBase-root.Mui-disabled ":
									{
										paddingRight: 0,
									},
							}),
							...(dense && {
								// "& .MuiAutocomplete-root ": {
								// 	padding: 0,
								// },
								"&.MuiAutocomplete-root .MuiInputBase-root.MuiInputBase-sizeSmall":
									{
										paddingTop: "2px",
										paddingBottom: "2px",
										paddingLeft: "2px",
										paddingRight: "40px",
									},
							}),
						},
						...(Array.isArray(sx) ? sx : [sx]),
					]}
					{...rest}
				/>
			</PickerBox>
		);
	})
);
OptionPicker.displayName = "OptionPicker";
OptionPicker.propTypes = {
	// Global
	onChange: PropTypes.func,
	dnd: PropTypes.bool,
	dense: PropTypes.bool,
	size: PropTypes.string,
	// DSG support
	hideBorders: PropTypes.bool,
	hidePopupIndicator: PropTypes.bool,
	disablePointerEvents: PropTypes.bool,
	fadeOutDisabled: PropTypes.bool,
	//
	name: PropTypes.string,
	// Autocomplete
	options: PropTypes.array,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	noOptionsText: PropTypes.string,
	openText: PropTypes.string,
	clearText: PropTypes.string,
	closeText: PropTypes.string,
	TextFieldProps: PropTypes.object,
	loading: PropTypes.bool,
	loadingText: PropTypes.string,
	multiple: PropTypes.bool,
	ChipProps: PropTypes.object,
	// TextField
	placeholder: PropTypes.string,
	autoFocus: PropTypes.bool,
	inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	label: PropTypes.string,
	fullWidth: PropTypes.bool,
	variant: PropTypes.string,
	InputProps: PropTypes.object,
	inputProps: PropTypes.object,
	InputLabelProps: PropTypes.object,
	required: PropTypes.bool,
	error: PropTypes.bool,
	helperText: PropTypes.string,
	disabled: PropTypes.bool,
	onInputChange: PropTypes.func,
	getOptionLabel: PropTypes.func,
	// PickerBox
	BoxProps: PropTypes.object,
	focusedBackgroundColor: PropTypes.string,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
		PropTypes.array,
	]),
	renderTagLabel: PropTypes.func,
	getOptionKey: PropTypes.func,
	getTitle: PropTypes.func,
	filterSelectedOptions: PropTypes.bool,
	virtualize: PropTypes.bool,
	labelShrink: PropTypes.bool,
	renderOption: PropTypes.func,
	renderGroup: PropTypes.func,
	// renderRow: PropTypes.func,
	dontFilterOptions: PropTypes.bool,
	stringify: PropTypes.func,
	renderOptionLabel: PropTypes.func,
	optionLabelSize: PropTypes.string,
};
export default OptionPicker;
