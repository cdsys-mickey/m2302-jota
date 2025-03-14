import Types from "@/shared-modules/sd-types";
/* eslint-disable no-mixed-spaces-and-tabs */
import { toastEx } from "@/helpers/toast-ex";
import Colors from "@/modules/md-colors";
import {
	Autocomplete,
	Chip,
	CircularProgress,
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
import { useChangeTracking } from "../../shared-hooks/useChangeTracking";
import MuiStyles from "../../shared-modules/sd-mui-styles";
import { OptionGridPaper } from "./grid/OptionGridPaper";
import OptionPickerBox from "./listbox/OptionPickerBox";
import VirtualizedPickerListbox from "./listbox/VirtualizedPickerListbox";

const AUTO_COMPLETE_DEFAULTS = {
	autoHighlight: true,
};

const MSG_NOT_FOUND_DEFAULT = "${id} 不存在";

const noFilterOptions = (options) => {
	return options;
};

/**
 * getOptionLabel: 預設用於繪製選擇及選定的 option
 * renderOptionLabel: 單獨繪製選擇的 option
 * stringify: 繪製用於過濾用的文字
 */
const OptionPicker = memo(
	forwardRef((props, ref) => {

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
			notFoundText = MSG_NOT_FOUND_DEFAULT,
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
			focusNextCell,
			focusPrevCell,
			cell,
			// FormMeta
			inFormMeta,
			focusNextField,
			disableEnter,
			emptyId,
			isFieldDisabled,
			setFocus,
			supressEvents,
			isTouched,
			isDirty,
			blurToLookup = false,
			blurToClearErrors = true,
			slotProps,
			borderless,
			...rest
		} = props;

		// console.log(`redenring OptionPicker: ${name}`);

		// const { focusNextCell } = useCellComponent(cellComponentRef?.current);


		const getNotFoundMessage = useCallback((params) => {
			if (Types.isString(notFoundText)) {
				const notFoundTemplete = _.template(notFoundText);
				return notFoundTemplete(params);
			} else if (Types.isFunction(notFoundText)) {
				return notFoundText(params);
			}
		}, [notFoundText]);

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
			// 忽略下一次 blur 事件
			skipBlur: false,
			// 沒有值仍觸發 focusNext
			// focusNextWhenEmpty: false,
			performFocusNext: false
		});
		const innerInputRef = useRef();
		useImperativeHandle(inputRef, () => innerInputRef.current);

		const [popperOpen, setPopperOpen] = useState(open || false);

		const handleInputChange = useCallback(
			(event) => {
				const input = event.target.value;
				console.log(`handleInputChange: "${input}"`);

				// 原本輸入框刪到空白則取消 dirty 狀態,
				// 但為了支援空 id, 因此這裡改成允許空白時保留 dirty 狀態

				// 清除值就清除錯誤
				if (!input && value) {
					onChange(multiple ? [] : null);
					if (name && clearErrors) {
						clearErrors(name);
					}
				}

				asyncRef.current.dirty = true;

				if (onInputChange) {
					onInputChange(event);
				}
				if (name && clearErrors) {
					clearErrors(name);
				}
			},
			[clearErrors, multiple, name, onChange, onInputChange, value]
		);

		const handleOpen = useCallback(
			(e, opts = {}) => {
				const { override = false } = opts;
				if (popperOpen) {
					console.log("popper already opened");
					return;
				}
				if (!disableOpenOnInput || e.type === "click" || override) {
					console.log("OptionPicker.handleOpen", e);
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
				// if (!popperOpen) {
				// 	return;
				// }
				if (onClose) {
					onClose(e);
				}
				if (!disableClose) {
					setPopperOpen(false);
				}
			},
			[disableClose, onClose]
		);

		const _open = useMemo(() => {
			return open !== null && open !== undefined ? open : popperOpen;
		}, [open, popperOpen]);

		// const _onOpen = useMemo(() => {
		// 	return onOpen || handleOpen;
		// }, [handleOpen, onOpen]);

		// const _onClose = useMemo(() => {
		// 	return onClose || handleClose;
		// }, [handleClose, onClose]);


		/**
		 * 先判斷 DSGContext.focusNextCell, 再判斷 FieldsContext.getNextField
		 */
		const focusNextCellOrField = useCallback(
			(e, opts = {}) => {
				const { forward } = opts;
				if (inDSG) {
					if (focusNextCell) {
						focusNextCell(cell, { forward: forward || !e?.shiftKey });
					}
				} else if (inFormMeta) {
					if (focusNextField) {
						e?.preventDefault();
						focusNextField(name, {
							setFocus,
							isFieldDisabled,
							forward: forward || !e?.shiftKey,
							e
						});
					}
				}
			},
			[inDSG, inFormMeta, focusNextCell, cell, focusNextField, name, setFocus, isFieldDisabled]
		);

		const handleChange = useCallback(
			(event, value, reason) => {
				// console.log(`OptionPicker.handleChange`, value);
				asyncRef.current.dirty = false;
				if (onChange) {
					console.log(`\ttriggered from parent, reason: ${reason}, event: `, event);
					onChange(value);
				}

				if (name && clearErrors) {
					clearErrors(name);
				}
			},
			[clearErrors, name, onChange]
		);

		const selectField = useCallback(() => {
			innerInputRef.current?.select();
		}, []);

		const refocus = useCallback((doSelect = true) => {
			console.log("refocus", doSelect);

			if (inDSG) {
				focusPrevCell();
			}

			innerInputRef.current?.focus();
			if (doSelect) {
				innerInputRef.current?.select();
			}



		}, [focusPrevCell, inDSG]);

		const inputNotFound = useCallback(
			(input, opts = {}) => {
				const { error } = opts;
				if (name && toastError) {
					toastEx.error(getNotFoundMessage({ id: input, error }));
				} else if (name && setError) {
					setError(name, {
						type: "manual",
						message: getNotFoundMessage({ id: input, error }),
					});
					return;
				} else {
					console.warn(
						"findByInput not found, but [name] or [setError] is not set"
					);
				}
			},
			[getNotFoundMessage, name, setError, toastError]
		);

		// const focusTimeoutRef = useRef();

		const handleLookup = useCallback(
			async (e, opts = {}) => {
				const { validate = false, } = opts;

				if (name && clearErrors) {
					clearErrors(name);
				}

				// if (!findByInput || _open || (!inFormMeta && !inDSG)) {
				if (_open || (!inFormMeta && !inDSG)) {
					return;
				}



				console.log("preventDefault/stopPropagation during handleLookup");
				e.preventDefault();
				e.stopPropagation();

				// 重設 focusTimeout
				// if (focusTimeoutRef.current) {
				// 	clearTimeout(focusTimeoutRef.current);
				// }

				// dirty check 是為了避免 option label 把 id+name 當作 id
				// if ((asyncRef.current.dirty) && findByInput) {
				const input = e.target.value;
				if (asyncRef.current.dirty && findByInput && (input || emptyId)) {
					console.log("handleLookup", e.key);
					let found;
					let error;
					try {
						found = input || emptyId ? await findByInput(input) : null;
					} catch (err) {
						error = err;
					}

					if (found) {
						asyncRef.current.dirty = false;
					} else {
						// 處理輸入清成空，卻必須跳下一個欄位的狀況
						if (!input) {
							asyncRef.current.performFocusNext = true;
						}

						inputNotFound(input, {
							error
						});
						selectField();
						return;
					}


					// 有改變會透過 ChangeTracking 觸發,
					// 這裡處理 dirty 之後, 卻沒改變, 仍要跳到下一個欄位的狀況
					if (multiple) {
						onChange([
							...value,
							found
						])
					} else {
						if (_.isEqual(found, value)) {
							asyncRef.current.dirty = false;
							focusNextCellOrField(e, opts);
						}
						onChange(found);
					}
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
					focusNextCellOrField(e, opts);
				}
				// focusNextCellOrField(e);
			},
			[name, clearErrors, _open, inFormMeta, inDSG, findByInput, emptyId, multiple, inputNotFound, selectField, onChange, value, focusNextCellOrField, getError, setError]
		);

		const handleArrowDown = useCallback(
			(e) => {
				if (!findByInput) {
					return;
				}
				// console.log("popperOpen", open);
				e.preventDefault();
				// 由於 Column.disableKeys 設為 true 會干擾 tab 運作，
				// 因此必須防止 arrow down 往下傳遞
				// e.stopPropagation();
				// _onOpen(e, { override: true });
				handleOpen(e, { override: true });
			},
			[findByInput, handleOpen]
		);

		const handleKeyDown = useCallback(
			(e) => {
				// console.log("e.key", e.key);
				switch (e.key) {
					case "Enter":
						// 按下 Shift 時必須略過不處理
						if (disableEnter || e.shiftKey) {
							return;
						}
						handleLookup(e, {
							validate: true,
							forward: true
						});
						break;
					case "Tab":
						handleLookup(e, {
							validate: false,
						});
						break;
					case "ArrowDown":
						handleArrowDown(e);
						break;
				}
			},
			[disableEnter, handleArrowDown, handleLookup]
		);

		const handleAutocompleteKeyDown = useCallback((e) => {
			// console.log("handleAutocompleteKeyDown", e);
			switch (e.key) {
				case "ArrowUp":
				case "ArrowDown":
				case "Enter":
					console.log("stopPropagation");
					e.stopPropagation();
					break;
			}
		}, [])

		const handleBlur = useCallback(
			async (e, opts) => {
				// console.log(`${OptionPicker.displayName}.handleBlur`, e);
				// 離開輸入焦點就清除錯誤
				if (blurToClearErrors && name && clearErrors) {
					clearErrors(name);
				}

				if (_open || (!inFormMeta && !inDSG)) {
					return;
				}
				e.preventDefault();
				const input = e.target.value;

				if (blurToLookup && asyncRef.current.dirty && findByInput && (input || emptyId)) {
					console.log("handleBlur: ", input);
					let found;
					// found = await findByInput(input);
					found = input || emptyId ? await findByInput(input) : null;
					if (found) {
						asyncRef.current.dirty = false;
						if (multiple) {
							onChange([
								...value,
								found
							])
						} else {
							if (_.isEqual(found, value)) {
								asyncRef.current.dirty = false;
								focusNextCellOrField(e, opts);
							}
							onChange(found);
						}
					} else {
						inputNotFound(input);
						refocus();
					}

				}


			},
			[_open, blurToClearErrors, blurToLookup, clearErrors, emptyId, findByInput, focusNextCellOrField, inDSG, inFormMeta, inputNotFound, multiple, name, onChange, refocus, value]
		);

		const _label = useMemo(() => {
			return borderless ? "" : label;
		}, [borderless, label])

		const renderNormalInput = useCallback(
			(params) => {
				// console.log("textFieldProps", textFieldProps);

				return (
					<TextField
						required={required}
						label={_label}
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
						// onBlur={blurToLookup ? handleBlur : undefined}
						onBlur={handleBlur}
						{...params}
						sx={[{
							...(required && !error && {
								"& .MuiInputLabel-root:not(.Mui-focused)": {
									color: Colors.REQUIRED,
								},
								"& .MuiOutlinedInput-root": {
									'& fieldset': {
										borderColor: Colors.REQUIRED,
									},
								}
							}),
							...(borderless && {
								"& .MuiFilledInput-root": {
									paddingTop: 0,
									paddingLeft: "4px",
									paddingRight: 0,
								}
							})
						}]}
						InputProps={{
							...params.InputProps,
							// textFieldProps 會帶入他的 override, 所以我們的修改必須放在他之後
							...(borderless && {
								disableUnderline: true
							}),
							...InputProps,
							endAdornment: (
								<>
									{loading ? <CircularProgress color="inherit" size={20} /> : null}
									{params.InputProps.endAdornment}
								</>
							),
						}}
						inputProps={{
							...params.inputProps,
							// textFieldProps 會帶入他的 override, 所以我們的修改必須放在他之後
							// ...(dense && {
							// 	padding: 0,
							// }),
							...inputProps,
						}}
						{...TextFieldProps}
						{...slotProps?.textField}
						{...(borderless && {
							variant: "filled",
						})}
						InputLabelProps={{
							...MuiStyles.DEFAULT_OPTION_PICKER_INPUT_LABEL_PROPS,
							...params.InputLabelProps,
							...InputLabelProps,
							...(labelShrink && { shrink: true }),
						}}
					/>
				);
			},
			[InputLabelProps, InputProps, TextFieldProps, _label, autoFocus, borderless, error, fullWidth, handleBlur, handleInputChange, handleKeyDown, helperText, hideControls, inputProps, labelShrink, loading, placeholder, required, size, slotProps?.textField, variant]
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
			(params) => {
				if (!dnd) {
					return renderNormalInput(params);
				}
				return renderDndInput(params);
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

		const _width = useMemo(() => {
			return fullWidth ? "100%" : (width || "fill-available");
		}, [fullWidth, width])


		useChangeTracking(() => {
			console.log(`[${name}].value changed`, value);
			// 當選項改變, 且有值, 且非 multiple
			if (focusNextCellOrField
				&& (
					(value || asyncRef.current.performFocusNext)
					&& (isTouched !== true)
				)
				&& !multiple && !supressEvents && !disabled
			) {
				console.log(`\tfocusNextCellOrField triggered, inFormMeta: ${inFormMeta}, isTouched: ${isTouched}, inDSG: ${inDSG}`);
				asyncRef.current.performFocusNext = false;
				focusNextCellOrField();
			} else {
				console.log("\tfocusNextCellOrField not triggered");
			}
		}, [value]);
		// useEffect(() => {
		// 	console.log("value changed", value);
		// 	// 當選項改變, 且有值, 且非 multiple
		// 	if (focusNextCellOrField
		// 		&& (
		// 			(value || asyncRef.current.performFocusNext)
		// 			&& (isTouched !== true)
		// 		)
		// 		&& !multiple && !supressEvents && !disabled
		// 	) {
		// 		console.log(`${name} changed, inFormMeta: ${inFormMeta}, isTouched: ${isTouched}, inDSG: ${inDSG}`, value);
		// 		asyncRef.current.performFocusNext = false;
		// 		focusNextCellOrField();
		// 	}
		// }, [disabled, focusNextCellOrField, inDSG, inFormMeta, isTouched, multiple, name, supressEvents, value]);

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
				width={_width}
				{...BoxProps}>
				<Autocomplete
					onKeyDown={handleAutocompleteKeyDown}
					onChange={handleChange}
					ref={ref}
					size={size}
					// slotProps={{
					// 	paper: {
					// 		component: ({ ...rest }) => (
					// 			<PaperComponent
					// 				elevation={8}
					// 				{...(GridHeaderComponent && {
					// 					HeaderComponent: GridHeaderComponent,
					// 				})}
					// 				{...rest}
					// 			/>
					// 		),
					// 		...slotProps?.paper,
					// 	},
					// 	...slotProps
					// }}
					// onBlur={handleBlur}
					PaperComponent={({ ...rest }) => (
						<PaperComponent
							elevation={8}
							{...(GridHeaderComponent && {
								HeaderComponent: GridHeaderComponent,
							})}
							{...rest}
							{...slotProps?.paper}
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
					onOpen={handleOpen}
					onClose={handleClose}
					// PopperComponent={OptionPickerPopper}
					open={_open}
					// onOpen={_onOpen}
					// onOpen={_onOpen}
					// onClose={_onClose}
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
						// 	disableListWrap: true,
					})}
					{...(virtualize && {
						disableListWrap: true,
					})}
				// ListboxProps={{
				// 	style: { minHeight: loading ? 100 : 'auto' } // 保留 Listbox 空間，避免重新渲染
				// }}
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
	notFoundText: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	focusNextCell: PropTypes.func,
	focusPrevCell: PropTypes.func,
	cell: PropTypes.object,
	toastError: PropTypes.bool,
	disableClose: PropTypes.bool,
	getNextField: PropTypes.func,
	focusNextField: PropTypes.func,
	isFieldDisabled: PropTypes.func,
	setFocus: PropTypes.func,
	inDSG: PropTypes.bool,
	inFormMeta: PropTypes.bool,
	disableEnter: PropTypes.bool,
	emptyId: PropTypes.bool,
	supressEvents: PropTypes.bool,
	cellComponentRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	isTouched: PropTypes.bool,
	isDirty: PropTypes.bool,
	borderless: PropTypes.bool,
	slotProps: PropTypes.object

};
export default OptionPicker;
