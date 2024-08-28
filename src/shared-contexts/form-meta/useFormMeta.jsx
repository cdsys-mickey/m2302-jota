import { useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";

import { LastFieldBehavior } from "./LastFieldBehavior";
import { toast } from "react-toastify";
import FormMeta from "../../shared-modules/sd-form-meta";

export const useFormMeta = (value, opts = {}) => {
	const form = useFormContext();
	const { setFocus } = form || {};
	const {
		disableEnter = false,
		lastField = LastFieldBehavior.BLUR,
		lastFieldMessage = "已是最後一個欄位",
		firstFieldMessage = "已是第一個欄位",
	} = opts;

	const fields = useMemo(() => {
		return FormMeta.parse(value);
	}, [value]);

	const getNextField = useCallback(
		(currentFieldName, opts = {}) => {
			const { forward = true, isFieldDisabled, e } = opts;
			const currentIndex = fields.findIndex(
				(item) => item.name === currentFieldName
			);
			if (currentIndex === -1) {
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

	const nextField = useCallback(
		(name, opts = {}) => {
			const { setFocus, forward = true } = opts;
			const nextField = getNextField(name, opts);
			console.log("nextField", nextField);
			if (nextField) {
				setFocus(nextField.name, {
					shouldSelect: nextField.select,
				});
			} else {
				if (typeof lastField === "string") {
					toast.warn(lastField, {
						position: "bottom-center",
					});
					return;
				} else if (typeof lastField === "function") {
					lastField(opts);
				} else {
					switch (lastField) {
						case LastFieldBehavior.PROMPT:
							toast.warn(
								forward ? lastFieldMessage : firstFieldMessage,
								{
									position: "bottom-center",
								}
							);
							break;
						case LastFieldBehavior.BLUR:
						default:
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
		nextField,
		disableEnter
	};
};
