import { FormControlLabel } from "@mui/material";
import PropTypes from "prop-types";
import { cloneElement } from "react";

const FormControlLabelWrapper = (props) => {
	const { children, label, ...rest } = props;

	if (!label) {
		return cloneElement(children, rest);
	}

	return (
		<FormControlLabel
			control={children}
			label={label}
			{...rest}
		/>
	)
}

FormControlLabelWrapper.propTypes = {
	label: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func])
}

export default FormControlLabelWrapper;