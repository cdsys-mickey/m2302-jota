import { toastEx } from "@/helpers/toastEx";
import { useCellComponent } from "@/shared-hooks/dsg/useCellComponent";
import Objects from "@/shared-modules/Objects";
import Types from "@/shared-modules/sd-types";
import clsx from "clsx";
import _ from "lodash";
import PropTypes from "prop-types";
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import InputMask from "react-input-mask";
import { useFirstRender } from "../../forked/hooks/useFirstRender";

const DATE_FORMAT = "yyyy/MM/dd";
const EMPTY = "____/__/__";
const MSG_REQUIRED = "必須輸入日期"

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		header: "date",
		fields: "rowData,active,disable,focus",
		// debug: true,
	});
}

const DateInputMaskComponent = memo((props) => {
	const {
		focus,
		active,
		rowData,
		setRowData,
		disabled,
		columnIndex,
		rowIndex,
		columnData = {},
		stopEditing,
		insertRowBelow,
	} = props;
	const inputRef = useRef(null);

	const firstRender = useFirstRender();
	const {
		// pattern = "\\d{4}-\\d{2}-\\d{2}",
		// Context Methods
		skipDisabled,
		// focusNextCell,
		focusPrevCell,
		getNextCell,
		lastCell,
		isLastRow,
		setActiveCell,
		readOnly,
		continuousUpdates,
		required,
		requiredMessage = MSG_REQUIRED
		// ...rest
	} = columnData;

	const asyncRef = useRef({
		rowData,
		setRowData,
		continuousUpdates,
		firstRender,
		focusedAt: 0,
		changedAt: 0,
		escPressed: false,
	})
	asyncRef.current = {
		rowData,
		setRowData,
		continuousUpdates,
		firstRender,
		focusedAt: asyncRef.current.focusedAt,
		changedAt: asyncRef.current.changedAt,
		escPressed: asyncRef.current.escPressed,
	}

	useLayoutEffect(() => {
		if (focus) {
			inputRef.current?.select();
		} else {
			inputRef.current?.blur();
		}
	}, [focus]);

	const { focusNextCell } = useCellComponent({
		getNextCell,
		lastCell,
		isLastRow,
		setActiveCell,
		stopEditing,
		insertRowBelow,
	});

	const cell = useMemo(() => {
		return {
			row: rowIndex,
			col: columnIndex,
		};
	}, [columnIndex, rowIndex]);

	// const value = useMemo(() => {
	// 	return DateTimes.format(rowData, DATE_FORMAT);
	// }, [rowData]);

	// const handleChange = useCallback(
	// 	(e) => {
	// 		console.log("handleChange", e.target.value)
	// 		const date = DateTimes.parse(e.target.value, DATE_FORMAT);
	// 		setRowData(isNaN(date?.getTime()) ? null : date);
	// 	},
	// 	[setRowData]
	// );
	// const handleChange = useCallback(
	// 	(e) => {
	// 		console.log("handleChange", e);
	// 		console.log("typeof", typeof e.target.value)
	// 		setRowData(e.target.value);
	// 	},
	// 	[setRowData]
	// );

	const handleKeyDown = useCallback(
		(e) => {
			// console.log("handleKeyDown", Events.forKey(e));
			switch (e.key) {
				case "Enter":
					e.preventDefault();
					stopEditing({ nextRow: false });
					setTimeout(() => {
						if (focusNextCell) {
							focusNextCell(cell, { forward: true });
						}
					});
					break;
			}
		},
		[cell, focusNextCell, stopEditing]
	);

	useLayoutEffect(() => {
		if (skipDisabled && active && disabled && !readOnly) {
			if (focusNextCell) {
				focusNextCell({ row: rowIndex, col: columnIndex });
			} else {
				console.log("focusNextCell is null");
			}
		}
	}, [active, columnIndex, disabled, focusNextCell, readOnly, rowIndex, skipDisabled]);

	// const [dateValue, setDateValue] = useState(null);

	// 雖然是監聽輸入字串, 但還是要等到可以解析為正式日期時才會觸發
	// const handleInputChange = useCallback((e) => {
	// 	console.log("handleInputChange", e.target.value);
	// 	// const inputValue = e.target.value.replace(/-/g, ''); // 去除 '-' 符號
	// 	setDateValue(e.target.value);
	// 	// if (inputValue.length === 8) {
	// 	// 	setDateValue(e.target.value);
	// 	// 	// 可以在這裡執行 onChange 的邏輯
	// 	// 	console.log('Date input completed:', e.target.value);
	// 	// }
	// 	// setRowData(e.target.value);
	// }, []);

	const isValidDate = useCallback((value) => {
		console.log(`date value ${value}`);
		const date = new Date(value);
		console.log("date", date);
		return !isNaN(new Date(value).getTime());
	}, []);

	const handleChange = useCallback((e) => {
		// console.log("handleChange", e.target.value);
		asyncRef.current.changedAt = Date.now();

		if (continuousUpdates) {
			setRowData(e.target.value);
			console.log("rowData updated", e.target.value)
		}
	}, [continuousUpdates, setRowData]);

	useEffect(() => {
		if (rowData == null && inputRef.value) {
			// DEL 時同步到 inputRef
			console.log("同步清空 ref");
			// inputRef.value = EMPTY;
			inputRef.value = "";
		} else if (rowData && !inputRef.value) {
			// 選擇時同步到 ref
			// const newDateValue = Forms.reformatDateAsDash(rowData, DateTimes.DATEFNS_DATE_DASH);
			console.log(`sync ref to ${rowData}`);
			inputRef.value = rowData;
		}
	}, [rowData]);

	const refocus = useCallback((opts = {}) => {
		const { select = true } = opts;
		console.log("refocus", select);

		focusPrevCell();

		inputRef.current?.focus();
		if (select) {
			inputRef.current?.select();
		}
	}, [focusPrevCell]);

	const getRequiredMessage = useCallback((params) => {
		if (Types.isFunction(requiredMessage)) {
			return requiredMessage(params);
		} else {
			const notFoundTemplete = _.template(requiredMessage || MSG_REQUIRED);
			return notFoundTemplete(params);
		}

	}, [requiredMessage]);

	useLayoutEffect(() => {
		if (focus) {
			if (inputRef.current) {
				// ref.current.value = asyncRef.current.formatInputOnFocus(
				// 	asyncRef.current.rowData
				// );
				inputRef.current.focus();
				inputRef.current.select();
			}
			asyncRef.current.escPressed = false;
			asyncRef.current.focusedAt = Date.now();
		} else {
			if (inputRef.current) {
				if (
					!asyncRef.current.escPressed &&
					!asyncRef.current.continuousUpdates &&
					!asyncRef.current.firstRender &&
					asyncRef.current.changedAt >= asyncRef.current.focusedAt
				) {
					if (!inputRef.current.value) {
						if (required) {
							const message = getRequiredMessage({ value: inputRef.current.value })

							toastEx.error(message, {
								position: "top-right"
							})
							setTimeout(() => {
								refocus();
							})
						}
					} else {
						const validationResult = isValidDate(inputRef.current.value);
						console.log("isValidDate", validationResult);
						if (!validationResult) {
							toastEx.error(`${inputRef.current.value}不是正確的日期格式`, {
								position: "top-right"
							})
							setTimeout(() => {
								refocus();
							})
						}
					}

					console.log(`${DateInputMaskComponent.displayName}.setRowDate`, inputRef.current.value);
					asyncRef.current.setRowData(inputRef.current.value);
				}
				inputRef.current.blur();
			}
		}
	}, [focus, getRequiredMessage, isValidDate, refocus, required]);

	useEffect(() => {
		if (!focus && inputRef.current && inputRef.current?.value != rowData) {
			console.log(`sync when not focused: ${inputRef.current.value} → ${rowData}`);
			// On blur or when the data changes, format it for display
			inputRef.current.value = rowData;
		}
	}, [focus, rowData]);

	return (
		<InputMask mask="9999/99/99" placeholder="YYYY/MM/DD"
			onChange={handleChange}
		>
			{(inputProps) => (
				<input
					className={clsx('dsg-input')}

					tabIndex={-1}
					// onChange={handleChange} // 用來更新顯示的值
					onKeyDown={handleKeyDown}
					style={{
						// pointerEvents: focus ? 'auto' : 'none',
						pointerEvents: active ? 'auto' : 'none',
						opacity: rowData || active ? undefined : 0,
					}}
					{...inputProps}
					ref={inputRef}
				/>
			)}
			{/* <input
				className={clsx('dsg-input')}
				// Important to prevent any undesired "tabbing"
				tabIndex={-1}
				max="9999-12-31"
				ref={ref}
				// The `pointerEvents` trick is the same than in `textColumn`
				// Only show the calendar symbol on non-empty cells, or when cell is active, otherwise set opacity to 0
				style={{
					// pointerEvents: focus ? 'auto' : 'none',
					pointerEvents: active ? 'auto' : 'none',
					opacity: rowData || active ? undefined : 0,
				}}

				onChange={handleChange} // 用來更新顯示的值
				onKeyDown={handleKeyDown}
			/> */}
		</InputMask>
	);
}, arePropsEqual);

DateInputMaskComponent.propTypes = {
	// Cell Props
	focus: PropTypes.bool,
	active: PropTypes.bool,
	rowData: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
		PropTypes.object,
	]),
	rowIndex: PropTypes.number,
	columnIndex: PropTypes.number,
	disabled: PropTypes.bool,
	columnData: PropTypes.object,
	// Cell Methods
	setRowData: PropTypes.func,
	stopEditing: PropTypes.func,
	insertRowBelow: PropTypes.func,
	// Context
	skipDisabled: PropTypes.bool,
	focusNextCell: PropTypes.func,
	getNextCell: PropTypes.func,
	lastCell: PropTypes.symbol,
	setActiveCell: PropTypes.func,
};

DateInputMaskComponent.displayName = "DateInputMaskComponent";
export default DateInputMaskComponent;
