/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Autocomplete,
	Chip,
	Paper,
	TextField,
	createFilterOptions,
} from "@mui/material";
import _ from "lodash";
import PropTypes from "prop-types";
import {
	forwardRef,
	memo,
	useCallback,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import { useCellComponent } from "../../shared-hooks/dsg/useCellComponent";
import { useChangeTracking } from "../../shared-hooks/useChangeTracking";
import MuiStyles from "../../shared-modules/sd-mui-styles";
import { OptionGridPaper } from "./grid/OptionGridPaper";
import OptionPickerBox from "./listbox/OptionPickerBox";
import VirtualizedPickerListbox from "./listbox/VirtualizedPickerListbox";

const AUTO_COMPLETE_DEFAULTS = {
	autoHighlight: true,
};

const MSG_NOT_FOUND = "${id} 不存在";

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
			// hidePlaceholder = false,
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
			// focusDelay = 20,
			open,
			onOpen,
			onClose,
			disableClose,
			// Tab & Enter,
			disableOpenOnInput,
			findByInput,
			getError,
			setError,
			clearErrors,
			notFoundText = MSG_NOT_FOUND,
			toastError,
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
			inDSG,
			cellComponentRef,
			// nextCell,
			cell,
			// FormMeta
			inFormMeta,
			nextField,
			disableEnter,
			emptyId,
			isFieldDisabled,
			setFocus,
			...rest
		} = props;

		const { nextCell } = useCellComponent(cellComponentRef?.current);
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
			skipBlur: false
		});
		const innerInputRef = useRef();
		useImperativeHandle(inputRef, () => innerInputRef.current);

		const [popperOpen, setPopperOpen] = useState(open || false);

		const handleInputChange = useCallback(
			(event) => {
				// const input = event.target.value;
				// console.log(`handleInputChange: "${input}"`);
				// 原本輸入框刪到空白則取消 dirty 狀態,
				// 但為了支援空 id, 因此這裡改成允許空白時保留 dirty 狀態
				asyncRef.current.dirty = true;
				// if (input) {
				// 	asyncRef.current.dirty = true;
				// } else {
				// 	if (!emptyId) {
				// 		asyncRef.current.dirty = false;
				// 	}
				// }

				if (onInputChange) {
					onInputChange(event);
				}
				if (name && clearErrors) {
					clearErrors(name);
				}
			},
			[clearErrors, name, onInputChange]
		);

		const handleOpen = useCallback(
			(e, opts = {}) => {
				const { override = false } = opts;
				if (popperOpen) {
					return;
				}
				if (!disableOpenOnInput || e.type === "click" || override) {
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
				if (!disableClose) {
					setPopperOpen(false);
				}
			},
			[disableClose, onClose, popperOpen]
		);

		const _open = useMemo(() => {
			return open !== null && open !== undefined ? open : popperOpen;
		}, [open, popperOpen]);

		const _onOpen = useMemo(() => {
			return onOpen || handleOpen;
		}, [handleOpen, onOpen]);

		const _onClose = useMemo(() => {
			return onClose || handleClose;
		}, [handleClose, onClose]);

		/**
		 * 先判斷 DSGContext.nextCell, 再判斷 FieldsContext.getNextField
		 */

		const nextCellOrField = useCallback(
			(e, opts = {}) => {
				const { forward } = opts;
				if (inDSG) {
					nextCell(cell, { forward: forward || !e?.shiftKey });
				} else if (inFormMeta) {
					e?.preventDefault();
					nextField(name, {
						setFocus,
						isFieldDisabled,
						forward: forward || !e?.shiftKey,
						e
					});
				}
			},
			[inDSG, inFormMeta, nextCell, cell, nextField, name, setFocus, isFieldDisabled]
		);

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
				// if (value) {
				// 	nextCellOrField(event);
				// }
				// nextCellOrField(event);
			},
			[clearErrors, name, onChange]
		);

		const refocus = useCallback(() => {
			// focusTimeoutRef.current = setTimeout(() => {
			// 	innerInputRef.current?.focus();
			// }, focusDelay);
			focusTimeoutRef.current = setTimeout(() => {
				innerInputRef.current?.focus();
			});
		}, []);

		const inputNotFound = useCallback(
			(input) => {
				if (name && toastError) {
					toast.error(notFoundMsg({ id: input }), {
						position: "top-center",
					});
				} else if (name && setError) {
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
			[name, notFoundMsg, setError, toastError]
		);

		const focusTimeoutRef = useRef();

		const handleEnter = useCallback(
			async (e, opts = {}) => {
				asyncRef.current.skipBlur = true;
				console.log("handleEnter", e);
				const { validate = false, } = opts;
				// console.log("handleEnter", event);
				// if (!findByInput || _open || (!inFormMeta && !inDSG)) {
				if (_open || (!inFormMeta && !inDSG)) {
					return;
				}

				e.preventDefault();
				e.stopPropagation();

				// 重設 focusTimeout
				if (focusTimeoutRef.current) {
					clearTimeout(focusTimeoutRef.current);
				}

				// dirty check 是為了避免 option label 把 id+name 當作 id
				// if ((asyncRef.current.dirty) && findByInput) {
				const input = e.target.value;
				if ((asyncRef.current.dirty) && findByInput) {
					asyncRef.current.dirty = false;

					const found = await findByInput(input);

					// handleChange(e, found);
					if (!found && validate) {
						inputNotFound(input);
						return;
					}
					// 有改變會透過 ChangeTracking 觸發, 
					// 這裡處理 dirty 之後卻沒改變的狀況
					if (_.isEqual(found, value)) {
						asyncRef.current.dirty = false;
						nextCellOrField(e, opts);
					}
					onChange(found);
				} else {
					if (validate) {
						const error = await getError();
						console.log("error:", error);
						if (error) {
							// 錯誤則不往下傳遞給 DSGGrid
							// e.stopPropagation();
							if (name && setError) {
								setError(name, error);
							} else {
								console.warn(
									"getError failed, but [name] or [setError] is not set"
								);
							}
							return;
						}
					}
					nextCellOrField(e, opts);
				}
				// nextCellOrField(e);
			},
			[_open, inFormMeta, inDSG, findByInput, emptyId, value, onChange, inputNotFound, nextCellOrField, getError, name, setError]
		);

		const handleArrowDown = useCallback(
			(e) => {
				if (!findByInput) {
					return;
				}
				console.log("popperOpen", open);
				e.preventDefault();
				// 由於 Column.disableKeys 設為 true 會干擾 tab 運作，
				// 因此必須防止 arrow down 往下傳遞
				// e.stopPropagation();
				_onOpen(e, { override: true });
			},
			[_onOpen, findByInput, open]
		);

		const handleKeyDown = useCallback(
			(e) => {
				console.log("e.key", e.key);
				switch (e.key) {
					case "Enter":
						// 按下 Shift 時必須略過不處理
						if (disableEnter || e.shiftKey) {
							return;
						}
						handleEnter(e, {
							validate: true,
							forward: true
						});
						break;
					case "Tab":
						handleEnter(e, {
							validate: false,
						});
						break;
					case "ArrowDown":
						handleArrowDown(e);
						break;
				}
			},
			[disableEnter, handleArrowDown, handleEnter]
		);

		const handleAutocompleteKeyDown = useCallback((e) => {
			// console.log("handleAutocompleteKeyDown", e);
			switch (e.key) {
				case "ArrowUp":
				case "ArrowDown":
				case "Enter":
					e.stopPropagation();
					break;
			}
		}, [])

		const handleBlur = useCallback(
			async (e) => {
				if (asyncRef.current.skipBlur) {
					asyncRef.current.skipBlur = false;
					return;
				}
				asyncRef.current.skipBlur = false;

				if (_open || (!inFormMeta && !inDSG)) {
					return;
				}
				e.preventDefault();
				const input = e.target.value;

				if (asyncRef.current.dirty) {
					asyncRef.current.dirty = false;
					console.log("handleBlur:", input);
					const found = await findByInput(input);
					if (!found) {
						inputNotFound(input);
						// refocus(focusDelay);
						refocus();
					}
				}
			},
			[_open, findByInput, inDSG, inFormMeta, inputNotFound, refocus]
		);

		const renderNormalInput = useCallback(
			(props) => {
				// console.log("textFieldProps", textFieldProps);

				return (
					<TextField
						required={required}
						label={label}
						// label={dense ? "" : label}
						size={size}
						fullWidth={fullWidth}
						error={error}
						helperText={helperText}
						// inputRef={inputRef}
						inputRef={innerInputRef}
						variant={variant}
						// placeholder={hidePlaceholder ? "" : placeholder}
						placeholder={hideControls ? "" : placeholder}
						autoFocus={autoFocus}
						// onChange={onInputChange}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						// onBlur={handleBlur}
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
							...MuiStyles.DEFAULT_OPTION_PICKER_INPUT_LABEL_PROPS,
							...props.InputLabelProps,
							...InputLabelProps,
							...(labelShrink && { shrink: true }),
						}}
					/>
				);
			},
			[InputLabelProps, InputProps, TextFieldProps, autoFocus, error, fullWidth, handleBlur, handleInputChange, handleKeyDown, helperText, hideControls, inputProps, label, labelShrink, placeholder, required, size, variant]
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


		useChangeTracking(() => {
			console.log(`${name} changed`, value);
			// if (nextCellOrField && (value || emptyId)) {
			// 當選項改變, 且有值, 且非 multiple
			if (nextCellOrField && value && !multiple) {
				// if (nextCellOrField) {
				nextCellOrField();
			}
		}, [value, emptyId]);

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
					onKeyDown={handleAutocompleteKeyDown}
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
					// open={popperOpen}
					// onOpen={handleOpen}
					// onClose={handleClose}
					open={_open}
					onOpen={_onOpen}
					onClose={_onClose}
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
					{...AUTO_COMPLETE_DEFAULTS}
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
	// hidePlaceholder: PropTypes.bool,
	tagDisabled: PropTypes.func,
	// Popper Open 控制
	findByInput: PropTypes.func,
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
	open: PropTypes.bool,
	focusDelay: PropTypes.number,
	// selectNext: PropTypes.bool,
	disableOpenOnInput: PropTypes.bool,
	// pressToFind: PropTypes.bool,
	getError: PropTypes.func,
	setError: PropTypes.func,
	clearErrors: PropTypes.func,
	notFoundText: PropTypes.string,
	nextCell: PropTypes.func,
	cell: PropTypes.object,
	toastError: PropTypes.bool,
	disableClose: PropTypes.bool,
	getNextField: PropTypes.func,
	nextField: PropTypes.func,
	isFieldDisabled: PropTypes.func,
	setFocus: PropTypes.func,
	inDSG: PropTypes.bool,
	inFormMeta: PropTypes.bool,
	disableEnter: PropTypes.bool,
	emptyId: PropTypes.bool,
	cellComponentRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
export default OptionPicker;
