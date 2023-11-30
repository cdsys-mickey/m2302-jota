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

// const PickerPaper = (props) => {
// 	const { elevation = 8, ...rest } = props;
// 	return <Paper elevation={elevation} {...rest} />;
// };

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

const OptionPicker = memo(
	forwardRef((props, ref) => {
		const {
			name,
			options,
			fullWidth,
			// disablePortal = true,
			variant,
			// noOptionsText = "無可用選項",
			// typeToSearchText = "請輸入關鍵字進行搜尋",
			clearText = "清除",
			closeText = "收和",
			openText = "展開",
			value,
			// onChange,
			multiple = false,
			ChipProps,
			filterSelectedOptions,
			disableCloseOnSelect,
			TextFieldProps,
			placeholder,
			inputRef,
			dnd = false,
			//
			label,
			loading = false,
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
			// dontClose = false,
			// dnd = true,
			size = "small",
			sx = [],
			// METHODS
			onInputChange,
			...rest
		} = props;

		const chipProps = useMemo(() => {
			if (multiple && !ChipProps) {
				return MuiStyles.DEFAULT_MULTIPLE_OPTIONS_CHIP_PROPS;
			}
			return ChipProps;
		}, [ChipProps, multiple]);

		const noOptionsTextValue = useMemo(() => {}, []);

		const filterSelectedOptionsValue = useMemo(() => {}, []);

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
						onChange={onInputChange}
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

		const renderNormalTags = useCallback((value) => {
			// return value?.map((v, index) => (
			return value?.map((v) => (
				<Chip key={v} label={v} size="small" color="primary" />
			));
		}, []);

		const renderDndTags = useCallback(
			// (value, getCustomizedTagProps, ownerState) => {
			(value, getCustomizedTagProps) => {
				// console.debug(value, "renderTags");
				return value?.map((o, index) => (
					<Draggable key={o} draggableId={o} index={index}>
						{/* {(provided, snapshot) => ( */}
						{(provided) => (
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

		return (
			<PickerBox
				focusedBackgroundColor={focusedBackgroundColor}
				size={size}>
				<Autocomplete
					ref={ref}
					size={size}
					PaperComponent={({ ...rest }) => (
						<Paper elevation={8} {...rest} />
					)}
					// PaperComponent={PickerPaper}
					ChipProps={chipProps}
					disabled={disabled}
					// disablePortal={disablePortal}
					noOptionsText={noOptionsTextValue}
					clearText={clearText}
					closeText={closeText}
					openText={openText}
					multiple={multiple}
					filterSelectedOptions={filterSelectedOptionsValue}
					renderInput={renderInput}
					renderTags={renderTags}
					loading={loading}
					loadingText={loadingText}
					value={value}
					sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
					options={options}
					{...rest}
				/>
			</PickerBox>
		);
	})
);
OptionPicker.displayName = "OptionPicker";
OptionPicker.propTypes = {
	onInputChange: PropTypes.func,
	options: PropTypes.array,
};
export default OptionPicker;
