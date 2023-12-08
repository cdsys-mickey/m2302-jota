import { memo } from "react";
import OptionPicker from "../../../picker/OptionPicker";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useLayoutEffect } from "react";

const OptionPickerColumn = memo((props) => {
	const {
		options,
		ComponentProps,
		/** BUILT-IN PROPS */
		focus,
		rowData,
		setRowData,
		active,
		stopEditing,
		disabled,
	} = props;
	const ref = useRef();

	// This function will be called only when `focus` changes
	useLayoutEffect(() => {
		if (focus) {
			ref.current?.focus();
		} else {
			ref.current?.blur();
		}
	}, [focus]);

	return (
		<OptionPicker
			readOnly={disabled}
			inputRef={ref}
			hideBorders
			options={options}
			value={rowData}
			{...ComponentProps}
		/>
	);
});

OptionPickerColumn.propTypes = {
	options: PropTypes.array,
	ComponentProps: PropTypes.object,
};

OptionPickerColumn.displayName = "OptionPickerColumn";
export default OptionPickerColumn;
