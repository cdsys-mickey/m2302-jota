import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";

export const FormFieldLabelContainer = (props) => {
	const { name, ...rest } = props;
	const value = useWatch({
		name,
	});

	return <FormFieldLabel {...rest}>{value}</FormFieldLabel>;
};

FormFieldLabelContainer.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
};

FormFieldLabelContainer.displayName = "FormFieldLabelContainer";
