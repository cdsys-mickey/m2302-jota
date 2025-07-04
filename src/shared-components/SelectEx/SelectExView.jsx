import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useCallback } from "react";
import { useMemo } from "react";

const SelectExView = memo(forwardRef((props, ref) => {
	const { name, value, fullWidth, label, options, getOptionKey, getOptionLabel, ...rest } = props;

	const defaultGetOptionKey = useCallback((option) => {
		return option;
	}, []);

	const _getOptionKey = useCallback((option) => {
		const getOptionKeyMethod = getOptionKey || defaultGetOptionKey;
		return getOptionKeyMethod(option);
	}, [defaultGetOptionKey, getOptionKey]);

	const defaultGetOptionLabel = useCallback((option) => {
		return option;
	}, []);

	const _getOptionLabel = useCallback((option) => {
		const getOptionLabelMethod = getOptionLabel || defaultGetOptionLabel;
		return getOptionLabelMethod(option);
	}, [defaultGetOptionLabel, getOptionLabel]);

	const labelId = useMemo(() => {
		return `label_${name}`
	}, [name])

	// const _value = useMemo(() => {
	// 	return _getOptionKey(value);
	// }, [_getOptionKey, value])

	return (
		<FormControl fullWidth={fullWidth}>
			<InputLabel id={labelId}>{label}</InputLabel>
			<Select
				id={name}
				ref={ref}
				labelId={labelId}
				label={label}
				// value={_value}
				value={value}
				{...rest}
			>
				{options.map(option => {
					const key = _getOptionKey(option);
					const label = _getOptionLabel(option);
					return <MenuItem key={key} value={key}>{label}</MenuItem>
				})}
			</Select>
		</FormControl>
	);
}));

SelectExView.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	fullWidth: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func]),
	options: PropTypes.array,
	getOptionKey: PropTypes.func,
	getOptionLabel: PropTypes.func,
	value: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number, PropTypes.bool])
}

SelectExView.displayName = "SelectExView";
export default SelectExView;