import { useLayoutEffect, useMemo, useRef } from "react";

export const useOptionPickerComponent = (opts) => {
	const {
		focus,
		active,
		disabled,
		hideControlsOnActive,
		selectOnFocus,
		rowIndex,
		columnIndex,
	} = opts;

	const ref = useRef();

	const hideControls = useMemo(() => {
		return disabled || hideControlsOnActive ? !focus : !active;
	}, [active, hideControlsOnActive, disabled, focus]);

	const cell = useMemo(() => {
		return {
			row: rowIndex,
			col: columnIndex,
		};
	}, [columnIndex, rowIndex]);

	// focusing on the underlying input component when the cell is focused
	useLayoutEffect(() => {
		if (focus) {
			ref.current?.focus();
			if (selectOnFocus) {
				ref.current?.select();
			}
		} else {
			ref.current?.blur();
		}
	}, [focus, selectOnFocus]);

	return {
		ref,
		hideControls,
		cell,
	};
};
