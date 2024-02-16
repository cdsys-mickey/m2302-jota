import {
	Autocomplete,
	Box,
	Chip,
	Paper,
	TextField,
	styled,
} from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo, useCallback, useMemo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import MuiStyles from "../../shared-modules/sd-mui-styles";

const PickerBox = styled(Box, {
	shouldForwardProp: (prop) =>
		!["focusedBackgroundColor", "size", "hideBorders"].includes(prop),
})(({ theme, focusedBackgroundColor, size, hideBorders, width }) => ({
	...(hideBorders && {
		"& fieldset": { border: "none" },
	}),
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
	...(!width && {
		width: "100%",
	}),
}));

const OptionPicker = memo(
	forwardRef((props, ref) => {
		const {
			// Global
			onChange,
			dense = false,
			dnd = false,
			size = "small",
			hideBorders = false,
			name,

			// Autocomplete
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

			// PickerBox
			width,
			BoxProps,
			focusedBackgroundColor = "#b6f0ff",

			// METHODS
			...rest
		} = props;

		const chipProps = useMemo(() => {
			if (multiple && !ChipProps) {
				return MuiStyles.DEFAULT_MULTIPLE_OPTIONS_CHIP_PROPS;
			}
			return ChipProps;
		}, [ChipProps, multiple]);

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
						placeholder={placeholder}
						autoFocus={autoFocus}
						onChange={onInputChange}
						// 在 Autocomplete 層 disabled 就可以
						// disabled={disabled}

						{...textFieldProps}
						InputProps={{
							...textFieldProps.InputProps,
							// textFieldProps 會帶入他的 override, 所以我們的修改必須放在他之後
							...InputProps,
						}}
						inputProps={{
							...textFieldProps.inputProps,
							// textFieldProps 會帶入他的 override, 所以我們的修改必須放在他之後
							// ...(dense && {
							// 	padding: 0,
							// }),
							...inputProps,
						}}
						{...TextFieldProps}
						InputLabelProps={{
							...textFieldProps.InputLabelProps,
							...InputLabelProps,
						}}
					/>
				);
			},
			[
				InputLabelProps,
				InputProps,
				TextFieldProps,
				autoFocus,
				error,
				fullWidth,
				helperText,
				inputProps,
				inputRef,
				label,
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
			(value) => {
				// return value?.map((v, index) => (
				return value?.map((v) => {
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
						/>
					);
				});
			},
			[getOptionKey, getOptionLabel, renderTagLabel]
		);

		const renderDndTags = useCallback(
			// (value, getCustomizedTagProps, ownerState) => {
			(value, getCustomizedTagProps) => {
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
									{...getCustomizedTagProps({ index })}
								/>
								// </div>
							)}
						</Draggable>
					);
				});
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

		// eslint-disable-next-line no-unused-vars
		const handleChange = (event, value, reason) => {
			if (onChange) {
				console.log(`parent.onChange`, value);
				onChange(value);
			}
		};

		const memoisedTitle = useMemo(() => {
			if (getTitle) {
				return getTitle(value);
			}

			return getOptionLabel ? getOptionLabel(value) : value;
		}, [getOptionLabel, getTitle, value]);

		return (
			<PickerBox
				hideBorders={hideBorders}
				focusedBackgroundColor={focusedBackgroundColor}
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
					options={options}
					getOptionLabel={getOptionLabel}
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
	hideBorders: PropTypes.bool,
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
};
export default OptionPicker;
