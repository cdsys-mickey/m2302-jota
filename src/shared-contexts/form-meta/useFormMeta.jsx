import { useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";

import { LastFieldBehavior } from "./LastFieldBehavior";
import { toast } from "react-toastify";
import FormMeta from "../../shared-modules/sd-form-meta";
import { useRef } from "react";

export const useFormMeta = (value, opts = {}) => {
	const asyncRef = useRef({
		supressEvents: false
	});

	const form = useFormContext();
	const { setFocus } = form || {};
	const {
		disableEnter = false,
		// lastField = LastFieldBehavior.BLUR,
		// 預設改為 null, 當沒有指定 lastField 時焦點應留在原位
		lastField = null,
		lastFieldMessage = "已是最後一個欄位",
		firstFieldMessage = "已是第一個欄位",
	} = opts;

	const fields = useMemo(() => {
		return FormMeta.parse(value);
	}, [value]);

	const getNextField = useCallback(
		(currentFieldName, opts = {}) => {
			const { forward = true, isFieldDisabled, e } = opts;
			const currentIndex = currentFieldName ? fields.findIndex(
				(item) => item.name === currentFieldName
			) : -1;
			if (currentIndex === -1 && (!fields || fields.length === 0)) {
				return null;
			}

			if (forward) {
				for (let i = currentIndex + 1; i < fields.length; i++) {
					const field = fields[i];
					if (e?.key === "Enter" && field.skipEnter) {
						continue;
					}

					if (!isFieldDisabled || !isFieldDisabled(field)) {
						return field;
					} else {
						if (isFieldDisabled) {
							console.log(`field [${field.name}] is disabled`, field);
						}
					}
				}
			} else {
				for (let i = currentIndex - 1; i >= 0; i--) {
					const field = fields[i];
					if (e?.key === "Enter" && field.skipEnter) {
						continue;
					}
					if (!isFieldDisabled || !isFieldDisabled(field)) {
						return field;
					} else {
						if (isFieldDisabled) {
							console.log(`field [${field.name}] is disabled`, field);
						}
					}
				}
			}

			return null;
		},
		[fields]
	);

	const nextEnabled = useCallback(
		(currentFieldName, opts = {}) => {
			const { shouldSelect = true } = opts;
			const nextField = getNextField(currentFieldName, opts);
			console.log("nextField:", nextField);
			if (nextField && setFocus) {
				setFocus(nextField, {
					shouldSelect,
				});
			} else {
				console.warn(
					"nextField not found or setFocus is undefined, checks formMetaProvider"
				);
			}
		},
		[getNextField, setFocus]
	);

	const focusNextField = useCallback(
		(name, opts = {}) => {
			const { setFocus, forward = true } = opts;
			const nextField = getNextField(name, opts);
			console.log("nextField", nextField);
			console.log("opts", opts);
			if (nextField) {
				setFocus(nextField.name, {
					shouldSelect: nextField.select,
				});
			} else {
				if (typeof lastField === "string") {
					toast.warn(lastField, {
						position: "top-center",
					});
					return;
				} else if (typeof lastField === "function") {
					// 為了避免 lastField 自訂函式沒加 setTimeout, 因此在這裡統一處理
					// 沒加 setTimeout 會造成 keyDown 事件同步觸發到 grid 裡面多移一格
					// 只有順向才會觸發
					if (forward) {
						setTimeout(() => {
							lastField(opts);
						});
					}
				} else {
					switch (lastField) {
						case LastFieldBehavior.PROMPT:
							toast.warn(
								forward ? lastFieldMessage : firstFieldMessage,
								{
									position: "top-center",
								}
							);
							break;
						case LastFieldBehavior.BLUR:
							// default:
							document.activeElement.blur();
							break;
					}
				}
			}
		},
		[firstFieldMessage, getNextField, lastField, lastFieldMessage]
	);

	return {
		fields,
		getNextField,
		nextEnabled,
		focusNextField,
		disableEnter,
		asyncRef
	};
};
