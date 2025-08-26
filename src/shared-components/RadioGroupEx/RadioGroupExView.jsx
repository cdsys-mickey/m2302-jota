import { FormControl, FormHelperText, FormLabel, RadioGroup } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useCallback } from "react";
import RadioExView from "../RadioEx/RadioExView";


const RadioGroupExViewComponent = (props) => {
	const { children, label, options, getOptionLabel, error, helperText, RadioComponent = RadioExView, getOptionKey, ...rest } = props;

	if (!children && !options) {
		throw new Error("children 及 options 至少必須指定其中一個");
	}

	const defaultGetOptionLabel = useCallback((option, index) => {
		if (typeof option === "object") {
			const { label } = option;
			return [label].filter(Boolean).join(" ");
		}
		return option;
	}, []);

	const defaultGetOptionKey = useCallback((option, index) => {
		if (typeof option == "object") {
			const { id } = option;
			return id;
		}
		return option;
	}, []);

	const renderOption = useCallback((option, index) => {
		return getOptionLabel ? getOptionLabel(option, index) : defaultGetOptionLabel(option, index);
	}, [defaultGetOptionLabel, getOptionLabel]);

	const renderKey = useCallback((option, index) => {
		return getOptionKey ? getOptionKey(option, index) : defaultGetOptionKey(option, index);
	}, [defaultGetOptionKey, getOptionKey]);

	return (
		<FormControl>
			{label && <FormLabel>{label}</FormLabel>}
			<RadioGroup {...rest}>{options ? options.map((option, index) => {
				const label = renderOption(option, index);
				const key = renderKey(option, index);
				return <RadioComponent key={key} label={label} value={key} />
			}) : children}</RadioGroup>
			{helperText && (
				<FormHelperText error={!!error}>{helperText}</FormHelperText>
			)}
		</FormControl>
	);
}

RadioGroupExViewComponent.propTypes = {
	label: PropTypes.string,
	helperText: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.func]),
	options: PropTypes.array,
	getOptionLabel: PropTypes.func,
	getOptionKey: PropTypes.func,
	RadioComponent: PropTypes.element,
	error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
}
const RadioGroupExView = memo(RadioGroupExViewComponent);
export default RadioGroupExView;