/* eslint-disable no-mixed-spaces-and-tabs */
import _ from "lodash";
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
import { OptionGridPaper } from "./grid/OptionGridPaper";
import VirtualizedPickerListbox from "./listbox/VirtualizedPickerListbox";
import OptionPickerBox from "./listbox/OptionPickerBox";
import { useState } from "react";
import { useRef } from "react";
import { useImperativeHandle } from "react";

const MSG_NOT_FOUND = "${id} 找不到";

const noFilterOptions = (options) => {
	return options;
};

const OptionPicker = memo(
	forwardRef((props, ref) => {
		// console.log("redenring OptionPicker");
		const {
			// Global
			tagDisabled,
			onChange,
			dense = false,
			dnd = false,
			size = "small",
			hideBorders = false,
			hidePlaceholder = false,
			// hidePopupIndicator = false,
			// disablePointerEvents = false,
			hideControls = false,
			disableFadeOut = false,
			name,
			dontFilterOptions,
			stringify,
			// Autocomplete
			// filterSelectedOptions,
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
			// Popper open 控制
			// selectNext = false,
			focusDelay = 100,
			open,
			onOpen,
			onClose,
			// Tab & Enter,
			disableOpenOnInput,
			findByInput,
			pressToFind,
			nextInputRef,
			prevInputRef,
			getError,
			setError,
			clearErrors,
			notFoundText = MSG_NOT_FOUND,
			// VIRTUALIZATION
			virtualize,
			// PopperComponent,
			// ListboxComponent,
			renderOption,
			renderGroup,
			// renderRow = defaultRenderRow,
			optionLabelSize,
			// GRID support
			PaperComponent: customPaperComponent,
			GridHeaderComponent,
			GridRowComponent,
			...rest
		} = props;

		// if (dense && label) {
		// 	console.warn("dense 模式下強制不顯示 label");
		// }
		const notFoundMsg = _.template(notFoundText);

		// 參考 https://github.com/mui/material-ui/blob/master/packages/mui-base/src/useAutocomplete/useAutocomplete.js
		const memoisedFilterOptions = useMemo(() => {
			return dontFilterOptions
				? noFilterOptions
				: createFilterOptions({
						stringify,
				  });
		}, [dontFilterOptions, stringify]);

		// OPEN Control
		const asyncRef = useRef({
			dirty: false,
		});
		const innerInputRef = useRef();
		useImperativeHandle(inputRef, () => innerInputRef.current);

		const [popperOpen, setPopperOpen] = useState(open || false);
		// const [textFieldError, setTextFieldError] = useState(error);
		// const [textFieldHelperText, setTextFieldHelperText] =
		// 	useState(helperText);

		const handleInputChange = useCallback(
			(event) => {
				const input = event.target.value;
				// console.log("handleInputChange", input);
				if (input) {
					asyncRef.current.dirty = true;
				} else {
					asyncRef.current.dirty = false;
				}

				if (onInputChange) {
					onInputChange(event);
				}
				if (name && clearErrors) {
					clearErrors(name);
				}
				// setTextFieldError(false);
				// setTextFieldHelperText(null);
			},
			[clearErrors, name, onInputChange]
		);

		const handleOpen = useCallback(
			(e) => {
				// console.log("OptionPicker.onOpen", e);
				// console.log("open", open);
				if (popperOpen) {
					return;
				}
				if (!disableOpenOnInput || e.type === "click") {
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
				// console.log("OptionPicker.onClose", e);
				// console.log("open", popperOpen);
				if (!popperOpen) {
					return;
				}
				if (onClose) {
					onClose(e);
				}
				setPopperOpen(false);
			},
			[onClose, popperOpen]
		);

		// const zzFindByInput = useCallback(
		// 	async (input, opts = {}) => {
		// 		console.log("findByInput", input);

		// 		if (timerIdRef.current) {
		// 			clearTimeout(timerIdRef.current);
		// 		}
		// 		asyncRef.current.dirty = false;
		// 		const found = await findById(input);
		// 		if (found) {
		// 			console.log("found", found);
		// 			onChange(found);
		// 		} else {
		// 			console.log(`${input} not found`);
		// 			onChange(null);
		// 			if (name && setError) {
		// 				setError(name, {
		// 					type: "manual",
		// 					message: notFoundMsg({ id: input }),
		// 				});
		// 			}
		// 			if (opts.refocus) {
		// 				timerIdRef.current = setTimeout(() => {
		// 					innerInputRef.current?.focus();
		// 				}, focusDelay);
		// 			}
		// 		}
		// 		return found;
		// 	},
		// 	[findById, onChange, name, setError, notFoundMsg, focusDelay]
		// );

		const refocus = useCallback((focusDelay) => {
			timerIdRef.current = setTimeout(() => {
				innerInputRef.current?.focus();
			}, focusDelay);
		}, []);

		const nextInput = useCallback(
			(e) => {
				if (e.shiftKey) {
					if (prevInputRef?.current) {
						prevInputRef.current.focus();
						prevInputRef.current.select();
						return;
					} else {
						console.warn("prevInputRef not assigned");
					}
				} else {
					if (nextInputRef?.current) {
						nextInputRef.current.focus();
						nextInputRef.current.select();
					} else {
						console.warn("nextInputRef not assigned");
					}
				}
			},
			[nextInputRef, prevInputRef]
		);

		const inputNotFound = useCallback(
			(input) => {
				if (name && setError) {
					setError(name, {
						type: "manual",
						message: notFoundMsg({ id: input }),
					});
					return;
				} else {
					console.warn(
						"findByInput not found, but [name] or [setError] is not set"
					);
				}
			},
			[name, notFoundMsg, setError]
		);

		const timerIdRef = useRef();

		const handleEnter = useCallback(
			async (e, opts = { validate: false }) => {
				// console.log("handleEnter", event);
				if (!pressToFind || popperOpen) {
					return;
				}

				e.preventDefault();
				const input = e.target.value;

				// 重設
				if (timerIdRef.current) {
					clearTimeout(timerIdRef.current);
				}

				if (asyncRef.current.dirty) {
					asyncRef.current.dirty = false;
					const found = await findByInput(input);
					onChange(found);
					if (found) {
						nextInput(e);
					} else {
						inputNotFound(input);
					}
				} else {
					if (opts.validate) {
						const error = await getError();
						console.log("error:", error);
						if (error) {
							if (name && setError) {
								setError(name, error);
								return;
							}
							{
								console.warn(
									"getError failed, but [name] or [setError] is not set"
								);
							}
						} else {
							nextInput(e);
						}
					} else {
						nextInput(e);
					}
				}

				// *************** OLD **************

				// Shift-Tab
				// if (
				// 	event.key === "Tab" &&
				// 	event.shiftKey &&
				// 	prevInputRef?.current
				// ) {
				// 	event.preventDefault();
				// 	prevInputRef.current.focus();
				// 	prevInputRef.current.select();
				// 	return;
				// }

				// if (findById) {
				// 	event.preventDefault();
				// 	let found = true;
				// 	if (asyncRef.current.dirty) {
				// 		console.log("findById", event.target.value);
				// 		found = await findByInput(event.target.value);
				// 	}

				// 	if (!found) {
				// 		return;
				// 	}

				// 	// 介入驗證
				// 	if (opts.validate) {
				// 		const error = await getError();
				// 		console.log("error:", error);
				// 		if (error && name && setError) {
				// 			setError(name, error);
				// 			return;
				// 		}
				// 	}

				// 	if (nextInputRef?.current) {
				// 		nextInputRef.current.focus();
				// 		nextInputRef.current.select();
				// 	}
				// }
			},
			[
				pressToFind,
				popperOpen,
				findByInput,
				onChange,
				nextInput,
				inputNotFound,
				getError,
				name,
				setError,
			]
		);

		const handleArrowDown = useCallback(
			(e) => {
				if (!pressToFind) {
					return;
				}
				e.preventDefault();
				setPopperOpen(true);
			},
			[pressToFind]
		);

		const handleKeyDown = useCallback(
			(e) => {
				// console.log("e.key", e.key);
				switch (e.key) {
					case "Enter":
						handleEnter(e, { validate: true });
						break;
					case "Tab":
						handleEnter(e, { validate: false });
						break;
					case "ArrowDown":
						handleArrowDown(e);
						break;
				}
			},
			[handleArrowDown, handleEnter]
		);

		const handleBlur = useCallback(
			(e) => {
				if (!pressToFind) {
					return;
				}
				e.preventDefault();
				const input = e.target.value;

				if (asyncRef.current.dirty) {
					asyncRef.current.dirty = false;
					console.log("handleBlur:", input);
					const found = findByInput(input);
					if (!found) {
						inputNotFound(input);
						refocus(focusDelay);
					}
				}
			},
			[pressToFind, findByInput, inputNotFound, refocus, focusDelay]
		);

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
						// error={!!error}
						// helperText={error?.message}
						// inputRef={inputRef}
						inputRef={innerInputRef}
						variant={variant}
						placeholder={hidePlaceholder ? "" : placeholder}
						autoFocus={autoFocus}
						// onChange={onInputChange}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						onBlur={handleBlur}
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
				handleBlur,
				handleInputChange,
				handleKeyDown,
				helperText,
				hidePlaceholder,
				inputProps,
				label,
				labelShrink,
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

		const handleRenderInput = useCallback(
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
							{...(tagDisabled && {
								disabled: tagDisabled(v),
							})}
							// disabled={index === 0}
						/>
					);
				});
			},
			[getOptionKey, getOptionLabel, renderTagLabel, tagDisabled]
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
									{...(tagDisabled && {
										disabled: tagDisabled(v),
									})}
								/>
								// </div>
							)}
						</Draggable>
					);
				});
			},
			[getOptionKey, getOptionLabel, renderTagLabel, tagDisabled]
		);

		const renderTags = useCallback(
			(value, getTagProps, ownerState) => {
				if (dnd) {
					return renderDndTags(
						value,
						getTagProps,
						ownerState,
						tagDisabled
					);
				} else {
					return renderNormalTags(value, getTagProps, ownerState);
				}
			},
			[dnd, renderDndTags, renderNormalTags, tagDisabled]
		);

		// eslint-disable-next-line no-unused-vars
		const handleChange = useCallback(
			(event, value, reason) => {
				asyncRef.current.dirty = false;
				if (onChange) {
					console.log(`[${name}].onChange`, value);
					console.log(`reason: ${reason}, event: `, event);
					onChange(value);
				}

				if (name && clearErrors) {
					clearErrors(name);
				}
				nextInput(event);
			},
			[clearErrors, name, nextInput, onChange]
		);

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
				case "xs":
					return { fontSize: "70%" };
				case "sm":
					return {
						fontSize: "80%",
					};
				case "md":
					return {
						fontSize: "90%",
					};
				default:
					return {};
			}
		}, [optionLabelSize]);

		const defaultGetOptionLabel = useCallback((option) => {
			return option;
		}, []);

		const defaultRenderOption = useCallback(
			({ key, style, ...defaultOptionProps }, option) => {
				const renderOptionFunc =
					renderOptionLabel ||
					getOptionLabel ||
					defaultGetOptionLabel;

				return (
					<li
						{...defaultOptionProps}
						key={key}
						style={{
							...style,
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

		/**
		 * grid 版本 renderOption
		 */
		const renderGridOption = useCallback(
			({ key, style, ...optionProps }, option) => {
				return (
					<li key={key} style={style} {...optionProps}>
						<GridRowComponent value={option} />
					</li>
				);
			},
			[]
		);

		const handleRenderOption = useMemo(() => {
			if (GridRowComponent) {
				return renderGridOption;
			}
			if (virtualize) {
				return renderOptionForVirtualized;
			}
			return renderOption || defaultRenderOption;
		}, [
			GridRowComponent,
			virtualize,
			renderOption,
			defaultRenderOption,
			renderGridOption,
			renderOptionForVirtualized,
		]);

		const handleRenderGroup = useMemo(() => {
			return virtualize ? renderGroupForVirtualized : renderGroup;
		}, [renderGroup, renderGroupForVirtualized, virtualize]);

		const PaperComponent = useMemo(() => {
			if (GridHeaderComponent) {
				return OptionGridPaper;
			}
			return customPaperComponent || Paper;
		}, [GridHeaderComponent, customPaperComponent]);

		return (
			<OptionPickerBox
				// DSG 支援屬性
				hideBorders={hideBorders}
				focusedBackgroundColor={focusedBackgroundColor}
				// hidePopupIndicator={hidePopupIndicator}
				// disablePointerEvents={disablePointerEvents}
				hideControls={hideControls}
				disableFadeOut={disableFadeOut}
				size={size}
				title={memoisedTitle}
				width={width}
				{...BoxProps}>
				<Autocomplete
					onChange={handleChange}
					ref={ref}
					size={size}
					PaperComponent={({ ...rest }) => (
						<PaperComponent
							elevation={8}
							{...(GridHeaderComponent && {
								HeaderComponent: GridHeaderComponent,
							})}
							{...rest}
						/>
					)}
					// filterSelectedOptions={filterSelectedOptions}
					disabled={disabled}
					noOptionsText={noOptionsText}
					clearText={clearText}
					closeText={closeText}
					openText={openText}
					multiple={multiple}
					renderInput={handleRenderInput}
					renderTags={renderTags}
					loading={loading}
					loadingText={loadingText}
					value={value}
					options={options}
					getOptionLabel={getOptionLabel}
					renderOption={handleRenderOption}
					renderGroup={handleRenderGroup}
					filterOptions={memoisedFilterOptions}
					// Popper Open 控制
					open={popperOpen}
					onOpen={handleOpen}
					onClose={handleClose}
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
										// paddingRight: "40px",
									},
							}),
						},
						...(Array.isArray(sx) ? sx : [sx]),
					]}
					{...rest}
					// virtualize = true 時必須強制 override 部分屬性
					{...(virtualize && {
						ListboxComponent: VirtualizedPickerListbox,
						disableListWrap: true,
					})}
				/>
			</OptionPickerBox>
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
	// hidePopupIndicator: PropTypes.bool,
	// hidePlaceholder: PropTypes.bool,
	hideControls: PropTypes.bool,
	disablePointerEvents: PropTypes.bool,
	disableFadeOut: PropTypes.bool,
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
	// filterSelectedOptions: PropTypes.bool,
	virtualize: PropTypes.bool,
	labelShrink: PropTypes.bool,
	renderOption: PropTypes.func,
	renderGroup: PropTypes.func,
	// renderRow: PropTypes.func,
	dontFilterOptions: PropTypes.bool,
	stringify: PropTypes.func,
	renderOptionLabel: PropTypes.func,
	optionLabelSize: PropTypes.string,
	// GRID
	GridHeaderComponent: PropTypes.elementType,
	GridRowComponent: PropTypes.elementType,
	PaperComponent: PropTypes.elementType,
	hidePlaceholder: PropTypes.bool,
	tagDisabled: PropTypes.func,
	// Popper Open 控制
	findByInput: PropTypes.func,
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
	open: PropTypes.bool,
	focusDelay: PropTypes.number,
	// selectNext: PropTypes.bool,
	disableOpenOnInput: PropTypes.bool,
	pressToFind: PropTypes.bool,
	getError: PropTypes.func,
	setError: PropTypes.func,
	clearErrors: PropTypes.func,
	notFoundText: PropTypes.string,
	nextInputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	prevInputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
export default OptionPicker;
