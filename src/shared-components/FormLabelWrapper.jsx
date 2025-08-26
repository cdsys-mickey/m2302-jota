import { FormControl, FormLabel } from "@mui/material";
import PropTypes from "prop-types";
import { cloneElement } from "react";

const FormLabelWrapper = (props) => {
	const { children, label, ...rest } = props;

	if (!label) {
		return cloneElement(children, rest);
	}

	return (
		<FormControl>
			<FormLabel>{label}</FormLabel>
			{children}
		</FormControl>
	)
}

FormLabelWrapper.propTypes = {
	label: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func])
}

export default FormLabelWrapper;