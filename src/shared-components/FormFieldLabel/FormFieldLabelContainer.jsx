import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";
import { useMemo } from "react";
import FormFieldLabelView from "./FormFieldLabelView";

const FormFieldLabelContainer = (props) => {
	const { name, stringify, ...rest } = props;
	const value = useWatch({
		name,
	});

	const label = useMemo(() => {
		return stringify ? stringify(value) : value;
	}, [stringify, value]);

	return <FormFieldLabelView value={value} {...rest}>{label}</FormFieldLabelView>;
};

FormFieldLabelContainer.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	stringify: PropTypes.func,
};

FormFieldLabelContainer.displayName = "FormFieldLabelContainer";
export default FormFieldLabelContainer;