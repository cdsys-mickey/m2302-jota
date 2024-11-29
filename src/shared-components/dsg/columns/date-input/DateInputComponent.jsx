import { useCellComponent } from "@/shared-hooks/dsg/useCellComponent";
import Objects from "@/shared-modules/sd-objects";
import Types from "@/shared-modules/sd-types";
import clsx from "clsx";
import _ from "lodash";
import PropTypes from "prop-types";
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import { useFirstRender } from "../../forked/hooks/useFirstRender";
import { styled } from "@mui/system";

const MSG_REQUIRED = "必須輸入日期"

const FONT_SIZE = "1.0rem";
const FONT_FAMILY = "Consolas, Menlo";
const PLACEHOLDER = "____/__/__";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		header: "date",
		fields: "rowData,active,disable,focus",
		// debug: true,
	});
}

const InputContainer = styled("div")(({ theme }) => ({
	position: "relative",
	display: "inline-block",
	width: "inherit"
}));

const MaskedInput = styled("input")(({ theme }) => ({
	outline: "none",
	border: "none",
	fontSize: FONT_SIZE,
	fontFamily: FONT_FAMILY,
	// width: "200px",
	width: "100%",
	padding: "0px 8px",
	lineHeight: "1rem",
	// border: "1px solid #ccc",
	// borderRadius: "4px",
	backgroundColor: "transparent",
	position: "relative",
	zIndex: 1,
	color: "#000",
	"&::placeholder": {
		visibility: "hidden", // 隱藏原生 placeholder
	},
}));

const Placeholder = styled("div")(({ theme, visible }) => ({
	visibility: visible ? "visible" : "hidden",
	position: "absolute",
	top: "0px",
	left: "8px",
	fontFamily: FONT_FAMILY,
	fontSize: FONT_SIZE,
	color: "#aaa",
	pointerEvents: "none", // 不影響輸入
	zIndex: 0,
	"&::before": {
		content: '"____/__/__"',
	},
}));


const DateInputComponent = memo((props) => {
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
		setActiveCell,
		readOnly,
		continuousUpdates,
		required,
		requiredMessage = MSG_REQUIRED,
		disablePlaceholder = false,
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
		tabPressed: false,
		invalid: false
	})
	asyncRef.current = {
		rowData,
		setRowData,
		continuousUpdates,
		firstRender,
		focusedAt: asyncRef.current.focusedAt,
		changedAt: asyncRef.current.changedAt,
		escPressed: asyncRef.current.escPressed,
		tabPressed: asyncRef.current.tabPressed,
		invalid: asyncRef.current.invalid
	}

	const applyMask = useCallback((value) => {
		// 移除非數字字符
		let maskedValue = value.replace(/\D/g, '');

		// 應用遮罩格式：YYYY/MM/DD
		if (maskedValue.length > 4) {
			maskedValue = maskedValue.slice(0, 4) + '/' + maskedValue.slice(4);
		}
		if (maskedValue.length > 7) {
			maskedValue = maskedValue.slice(0, 7) + '/' + maskedValue.slice(7);
		}

		// 限制最大長度
		return maskedValue.slice(0, 10);
	}, []);

	const isValidDate = useCallback((value) => {
		if (value?.length < 10) {
			console.log("日期不足10位", value);
			return false;
		}
		console.log(`date value ${value}`);
		const date = new Date(value);
		console.log("date", date);
		return !isNaN(new Date(value).getTime());
	}, []);

	const handleChange = useCallback((e) => {
		// console.log("handleChange", e.target.value);
		asyncRef.current.changedAt = Date.now();
		// console.log("changedAt", asyncRef.current.changedAt);

		if (continuousUpdates) {
			setRowData(e.target.value);
			console.log("rowData updated", e.target.value)
		}
	}, [continuousUpdates, setRowData]);

	const handleInput = useCallback(() => {
		if (inputRef.current) {
			const rawValue = inputRef.current.value;
			const maskedValue = applyMask(rawValue);

			// 更新輸入框的值
			inputRef.current.value = maskedValue;
		}
	}, [applyMask]);

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

	const handleKeyDown = useCallback(
		(e) => {
			// console.log("handleKeyDown", Events.forKey(e));
			switch (e.key) {
				case "Escape":
					asyncRef.current.escPressed = true;
					break;
				case "Tab":
					asyncRef.current.tabPressed = true;
					e.preventDefault();
					stopEditing({ nextRow: false });
					setTimeout(() => {
						if (focusNextCell) {
							focusNextCell(cell, { forward: true });
						}
					});
					break;
				case "Enter":
					// ****** 下面這段不要隨意修改 *****, 
					// 與 TextComponentEx 不同, 
					// 這裡 stopEditing 不可放進下個 thread 執行,
					e.preventDefault();
					// e.stopPropagation();
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

	useEffect(() => {
		if (rowData == null && inputRef.value) {
			// DEL 時同步到 inputRef
			console.log("同步清空 ref");
			// inputRef.value = EMPTY;
			inputRef.value = "";
			asyncRef.current.changedAt = Date.now();
			console.log("changedAt", asyncRef.current.changedAt)
		} else if (rowData && !inputRef.value) {
			// 選擇時同步到 ref
			// const newDateValue = Forms.reformatDateAsDash(rowData, DateTimes.DATEFNS_DATE_DASH);
			console.log(`sync ref to ${rowData}`);
			inputRef.value = rowData;
			asyncRef.current.changedAt = Date.now();
			console.log("changedAt", asyncRef.current.changedAt)
		}
	}, [rowData]);

	const refocusOld = useCallback((opts = {}) => {
		const { select = true, touch = false } = opts;
		console.log("refocusOld", {
			select,
			touch
		});

		focusPrevCell();

		inputRef.current?.focus();
		if (touch) {
			asyncRef.current.focusedAt = Date.now();
			console.log("focusedAt", asyncRef.current.focusedAt)

			asyncRef.current.changedAt = Date.now();
			console.log("changedAt", asyncRef.current.changedAt)
		}
		if (select) {
			inputRef.current?.select();
		}
	}, [focusPrevCell]);

	const refocus = useCallback((opts = {}) => {
		const { select = true, touch = false } = opts;
		console.log("refocus", {
			select,
			touch
		});
		setTimeout(() => {
			focusPrevCell({
				col: columnIndex,
				row: rowIndex
			})

			inputRef.current?.focus();
			if (touch) {
				asyncRef.current.focusedAt = Date.now();
				console.log("focusedAt", asyncRef.current.focusedAt)

				asyncRef.current.changedAt = Date.now();
				console.log("changedAt", asyncRef.current.changedAt)
			}
			if (select) {
				inputRef.current?.select();
			}
		})


	}, [columnIndex, focusPrevCell, rowIndex]);

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
			console.log("focusedAt", asyncRef.current.focusedAt)
		} else {
			if (inputRef.current) {
				console.log("changedAt >= focusedAt", asyncRef.current.changedAt >= asyncRef.current.focusedAt);
				console.log("invalid", asyncRef.current.invalid)
				const modified = asyncRef.current.changedAt >= asyncRef.current.focusedAt;
				if (
					!asyncRef.current.escPressed &&
					!asyncRef.current.continuousUpdates &&
					!asyncRef.current.firstRender &&
					(modified || asyncRef.current.invalid)
				) {
					if (!inputRef.current.value) {
						if (required) {
							const message = getRequiredMessage({ value: inputRef.current.value })

							toast.error(message, {
								position: "top-right"
							})
							refocus();
						}
					} else {
						const validationResult = isValidDate(inputRef.current.value);
						console.log("isValidDate", validationResult);
						asyncRef.current.invalid = !validationResult;

						// 變更時錯誤的那次不能觸發
						if ((!modified || asyncRef.current.tabPressed) && asyncRef.current.invalid) {
							asyncRef.current.tabPressed = false;
							toast.error(`"${inputRef.current.value}" 不是正確的日期格式`, {
								position: "top-right"
							})
							refocus({
								touch: true
							})
						}

						// if (!validationResult) {

						// }
					}

					console.log(`${DateInputComponent.displayName}.setRowData`, inputRef.current.value);
					asyncRef.current.setRowData(inputRef.current.value || "");
				}
				inputRef.current.blur();
			}
		}
	}, [focus, getRequiredMessage, isValidDate, refocus, required]);

	useEffect(() => {
		if (!focus && inputRef.current && inputRef.current?.value != rowData) {
			console.log(`sync ref when not focused: ${inputRef.current.value} → ${rowData}`);
			// On blur or when the data changes, format it for display
			inputRef.current.value = rowData || "";
		}
	}, [focus, rowData]);

	return (
		<InputContainer>
			<MaskedInput
				// className={clsx('dsg-input')}
				tabIndex={-1}
				onChange={handleChange}
				onInput={handleInput}
				onKeyDown={handleKeyDown}
				placeholder={PLACEHOLDER}
				style={{
					// pointerEvents: focus ? 'auto' : 'none',
					pointerEvents: active ? 'auto' : 'none',
					opacity: rowData || active ? undefined : 0,
				}}
				ref={inputRef}
			/>
			<Placeholder visible={focus && !disablePlaceholder} />
		</InputContainer>
	);
}, arePropsEqual);

DateInputComponent.propTypes = {
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
	disablePlaceholder: PropTypes.bool
};

DateInputComponent.displayName = "DateInputComponent";
export default DateInputComponent;
