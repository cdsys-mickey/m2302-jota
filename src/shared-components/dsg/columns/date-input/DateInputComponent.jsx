import { toastEx } from "shared-components/toast-ex";
import { useCellComponent } from "@/shared-hooks/dsg/useCellComponent";
import Objects from "@/shared-modules/Objects.mjs";
import Types from "@/shared-modules/Types.mjs";
import { styled } from "@mui/system";
import { isValid, parse } from "date-fns";
import _ from "lodash";
import PropTypes from "prop-types";
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFirstRender } from "../../forked/hooks/useFirstRender";
import Events from "@/shared-modules/sd-events";
import { useState } from "react";

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

const Placeholder = styled("div")(({ theme, visible, placeholderText = "____/__/__" }) => ({
	visibility: visible ? "visible" : "hidden",
	position: "absolute",
	top: "0px",
	left: "8px",
	fontFamily: FONT_FAMILY,
	fontSize: FONT_SIZE,
	color: "#aaa",
	pointerEvents: "none",
	zIndex: 0,
	"&::before": {
		content: `"${placeholderText}"`, // 讓 placeholderText 成為 CSS 的 content
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
		// handleFocusNextCell,
		handleFocusPrevCell,
		getNextCell,
		lastCell,
		isLastRow,
		setActiveCell,
		readOnly,
		continuousUpdates,
		required,
		requiredMessage = MSG_REQUIRED,
		disablePlaceholder = false,
		placeholder = "____/__/__"
		// ...rest
	} = columnData;

	const [placeholderText, setPlaceholderText] = useState(placeholder);

	const asyncRef = useRef({
		rowData,
		setRowData,
		continuousUpdates,
		firstRender,
		focusedAt: 0,
		changedAt: 0,
		escPressed: false,
		tabPressed: false,
		invalid: false,
		errorHandling: false
	})

	// asyncRef.current = {
	// 	rowData,
	// 	setRowData,
	// 	continuousUpdates,
	// 	firstRender,
	// 	focusedAt: asyncRef.current.focusedAt,
	// 	changedAt: asyncRef.current.changedAt,
	// 	escPressed: asyncRef.current.escPressed,
	// 	tabPressed: asyncRef.current.tabPressed,
	// 	invalid: asyncRef.current.invalid,
	// }

	Object.assign(asyncRef.current, {
		rowData,
		setRowData,
		continuousUpdates,
		firstRender,
	});

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
		const parsedDate = parse(value, 'yyyy/MM/dd', new Date());
		console.log("parsedDate", parsedDate);
		return isValid(parsedDate);
	}, []);

	const handleChange = useCallback((e) => {
		// console.log("handleChange", e.target.value);
		asyncRef.current.changedAt = Date.now();
		// console.log("changedAt", asyncRef.current.changedAt);
		asyncRef.current.errorRefocus = false;

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
			const result = "\u00a0".repeat(maskedValue.length) + placeholder.slice(maskedValue.length);
			console.log(`"${result}"`);
			setPlaceholderText(result)
		}
	}, [applyMask, placeholder]);

	useLayoutEffect(() => {
		if (focus) {
			inputRef.current?.select();
		} else {
			inputRef.current?.blur();
		}
	}, [focus]);

	const { handleFocusNextCell } = useCellComponent({
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

	const handleKeyDown = useCallback(
		(e) => {
			console.log("handleKeyDown", Events.forKey(e));
			switch (e.key) {
				case "Escape":
					asyncRef.current.escPressed = true;
					break;
				case "Tab":
					asyncRef.current.tabPressed = true;
					e.preventDefault();
					stopEditing({ nextRow: false });
					setTimeout(() => {
						if (handleFocusNextCell) {
							handleFocusNextCell(cell, { forward: true });
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
						if (handleFocusNextCell) {
							handleFocusNextCell(cell, { forward: true });
						}
					});
					break;
			}
		},
		[cell, handleFocusNextCell, stopEditing]
	);

	useLayoutEffect(() => {
		if (skipDisabled && active && disabled && !readOnly) {
			if (handleFocusNextCell) {
				handleFocusNextCell({ row: rowIndex, col: columnIndex });
			} else {
				console.log("handleFocusNextCell is null");
			}
		}
	}, [active, columnIndex, disabled, handleFocusNextCell, readOnly, rowIndex, skipDisabled]);

	useEffect(() => {
		if (rowData == null && inputRef.value) {
			// DEL 時同步到 inputRef
			console.log("同步清空 ref");
			// inputRef.value = EMPTY;
			inputRef.current.value = "";
			asyncRef.current.changedAt = Date.now();
			console.log("changedAt", asyncRef.current.changedAt)
		} else if (rowData && !inputRef.value) {
			// 選擇時同步到 ref
			// const newDateValue = Forms.reformatDateAsDash(rowData, DateTimes.DATEFNS_DATE_DASH);
			console.log(`sync ref to ${rowData}`);
			inputRef.current.value = rowData;
			asyncRef.current.changedAt = Date.now();
			console.log("changedAt", asyncRef.current.changedAt)
		}
	}, [rowData]);

	// const refocusOld = useCallback((opts = {}) => {
	// 	const { select = true, touch = false } = opts;
	// 	console.log("refocusOld", {
	// 		select,
	// 		touch
	// 	});

	// 	handleFocusPrevCell();

	// 	inputRef.current?.focus();
	// 	if (touch) {
	// 		asyncRef.current.focusedAt = Date.now();
	// 		console.log("focusedAt", asyncRef.current.focusedAt)

	// 		asyncRef.current.changedAt = Date.now();
	// 		console.log("changedAt", asyncRef.current.changedAt)
	// 	}
	// 	if (select) {
	// 		inputRef.current?.select();
	// 	}
	// }, [handleFocusPrevCell]);

	const refocus = useCallback((opts = {}) => {
		const { select = true, touch = false } = opts;
		console.log("refocus", {
			select,
			touch
		});
		setTimeout(() => {
			handleFocusPrevCell({
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


	}, [columnIndex, handleFocusPrevCell, rowIndex]);

	const getRequiredMessage = useCallback((params) => {
		if (Types.isFunction(requiredMessage)) {
			return requiredMessage(params);
		} else {
			const notFoundTemplete = _.template(requiredMessage || MSG_REQUIRED);
			return notFoundTemplete(params);
		}

	}, [requiredMessage]);

	const checkEnter = useCallback(() => {
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
	}, []);

	const checkLeave = useCallback(() => {
		// 如果正在處理錯誤，或者組件已經卸載，直接跳過
		if (!inputRef.current || asyncRef.current.errorHandling) {
			return;
		}

		const value = inputRef.current.value;
		const modified = asyncRef.current.changedAt >= asyncRef.current.focusedAt;

		// 判斷是否需要驗證
		const shouldValidate = !asyncRef.current.escPressed &&
			!asyncRef.current.firstRender &&
			(modified || asyncRef.current.invalid || (required && !value));

		if (shouldValidate) {
			// --- 情況 A: 必填檢查 ---
			if (!value && required) {
				asyncRef.current.errorHandling = true; // 鎖定
				toastEx.error(getRequiredMessage({ value }), { position: "top-right" });

				asyncRef.current.changedAt = 0; // 清除修改標記避免迴圈
				setTimeout(() => {
					refocus({ touch: true });
					// 延遲久一點再解鎖，確保 refocus 引起的渲染已完成
					setTimeout(() => { asyncRef.current.errorHandling = false; }, 300);
				}, 50);
				return;
			}

			// --- 情況 B: 格式檢查 ---
			if (value) {
				const validationResult = isValidDate(value);
				asyncRef.current.invalid = !validationResult;

				if (asyncRef.current.invalid) {
					asyncRef.current.errorHandling = true; // 鎖定
					toastEx.error(`"${value}" 不是正確的日期格式`, { position: "top-right" });

					if (asyncRef.current.tabPressed) {
						asyncRef.current.tabPressed = false;
						inputRef.current.value = "";
					}

					asyncRef.current.changedAt = 0;
					setTimeout(() => {
						refocus({ touch: true });
						setTimeout(() => { asyncRef.current.errorHandling = false; }, 300);
					}, 50);
					return;
				}
			}

			// --- 情況 C: 通過驗證 ---
			console.log("Validation passed, updating rowData");
			asyncRef.current.setRowData(value || "");
		}

		inputRef.current.blur();
	}, [getRequiredMessage, isValidDate, refocus, required]);

	useLayoutEffect(() => {
		if (asyncRef.current.errorHandling) return; // 鎖定期間不回應 focus 變化

		if (focus) {
			checkEnter();
		} else {
			checkLeave();
		}
	}, [checkEnter, checkLeave, focus]);

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
				// placeholder={PLACEHOLDER}
				style={{
					// pointerEvents: focus ? 'auto' : 'none',
					pointerEvents: active ? 'auto' : 'none',
					opacity: rowData || active ? undefined : 0,
				}}
				ref={inputRef}
			/>
			<Placeholder
				visible={focus && !disablePlaceholder}
				placeholderText={placeholderText}
			/>
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
	handleFocusNextCell: PropTypes.func,
	getNextCell: PropTypes.func,
	lastCell: PropTypes.symbol,
	setActiveCell: PropTypes.func,
	disablePlaceholder: PropTypes.bool
};

DateInputComponent.displayName = "DateInputComponent";
export default DateInputComponent;
