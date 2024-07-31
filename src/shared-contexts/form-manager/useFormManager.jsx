import { useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import FormManager from "@/shared-modules/sd-form-manager";

export const useFormManager = (value) => {
	const form = useFormContext();
	const { setFocus } = form || {};

	const fields = useMemo(() => {
		return FormManager.parse(value);
	}, [value]);

	const getNextEnabled = useCallback(
		(currentFieldName, opts = {}) => {
			const { forward = true, isDisabled } = opts;
			const currentIndex = fields.findIndex(
				(item) => item.name === currentFieldName
			);
			if (currentIndex === -1) {
				return null;
			}

			if (forward) {
				for (let i = currentIndex + 1; i < fields.length; i++) {
					if (!isDisabled || !isDisabled(fields[i])) {
						return fields[i];
					}
				}
			} else {
				for (let i = currentIndex - 1; i >= 0; i--) {
					if (!isDisabled || !isDisabled(fields[i])) {
						return fields[i];
					}
				}
			}

			return null;
		},
		[fields]
	);

	const nextEnabled = useCallback(
		(currentFieldName, opts = {}) => {
			const { forward = true, shouldSelect = true } = opts;
			const nextField = getNextEnabled(currentFieldName, {
				forward,
			});
			console.log("nextField:", nextField);
			if (nextField && setFocus) {
				setFocus(nextField, {
					shouldSelect,
				});
			} else {
				console.warn(
					"nextField not found or setFocus is undefined, checks formManagerProvider"
				);
			}
		},
		[getNextEnabled, setFocus]
	);

	return {
		fields,
		getNextEnabled,
		nextEnabled,
	};
};
