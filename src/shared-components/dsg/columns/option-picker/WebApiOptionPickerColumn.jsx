import PropTypes from "prop-types";
import { memo, useCallback, useLayoutEffect, useRef } from "react";
import WebApiOptionPicker from "../../../picker/WebApiOptionPicker";

const WebApiOptionPickerColumn = memo((props) => {
	const {
		name,
		ComponentProps,
		/** BUILT-IN PROPS */
		focus,
		rowData,
		setRowData,
		active,
		stopEditing,
		disabled,
	} = props;
	console.log(`rendering WebApiOptionPickerColumn`, props);
	console.log(`rowData`, rowData);
	const ref = useRef();

	const handleChange = useCallback(
		(newValue) => {
			if (name) {
				setRowData({
					...rowData,
					[name]: newValue,
				});
			} else {
				setRowData(newValue);
			}
		},
		[name, rowData, setRowData]
	);

	// focusing on underlying input component when cel is focused
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
			{...ComponentProps}
		/>
	);
});

WebApiOptionPickerColumn.propTypes = {
	focus: PropTypes.bool,
	name: PropTypes.string,
	url: PropTypes.string,
	ComponentProps: PropTypes.object,
	rowData: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
	]),
	setRowData: PropTypes.func,
	active: PropTypes.bool,
	stopEditing: PropTypes.func,
	disabled: PropTypes.bool,
};

WebApiOptionPickerColumn.displayName = "WebApiOptionPickerColumn";
export default WebApiOptionPickerColumn;
