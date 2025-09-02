import { FormControl, FormLabel } from "@mui/material";
import PropTypes from "prop-types";

const FormLabelWrapper = (props) => {
	const { children, label } = props;

	return (
		<FormControl>
			{label && (<FormLabel>{label}</FormLabel>)}
			{children}
		</FormControl>
	)
}

FormLabelWrapper.propTypes = {
	label: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.func])
}

export default FormLabelWrapper;