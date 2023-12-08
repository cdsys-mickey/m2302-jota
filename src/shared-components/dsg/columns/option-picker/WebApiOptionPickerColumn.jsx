import { memo } from "react";
import WebApiOptionPicker from "../../../picker/WebApiOptionPicker";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import { useCallback } from "react";

const WebApiOptionPickerColumn = memo((props) => {
	const {
		// url,
		// parameters,
		// bearer,
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

	const handleChange = useCallback(
		(newValue) => {
			setRowData(newValue);
		},
		[setRowData]
	);

	// This function will be called only when `focus` changes
	useLayoutEffect(() => {
		if (focus) {
			ref.current?.focus();
		} else {
			ref.current?.blur();
		}
	}, [focus]);

	return (
		<WebApiOptionPicker
			disabled={disabled}
			inputRef={ref}
			hideBorders
			value={rowData}
			onChange={handleChange}
			// url={url}
			// parameters={parameters}
			// bearer={bearer}
			{...ComponentProps}
		/>
	);
});

WebApiOptionPickerColumn.propTypes = {
	url: PropTypes.string,
	ComponentProps: PropTypes.object,
};

WebApiOptionPickerColumn.displayName = "WebApiOptionPickerColumn";
export default WebApiOptionPickerColumn;
