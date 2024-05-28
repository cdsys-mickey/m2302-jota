import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import { useMemo } from "react";

export const FormFieldLabelContainer = (props) => {
	const { name, stringify, ...rest } = props;
	const value = useWatch({
		name,
	});

	const label = useMemo(() => {
		return stringify ? stringify(value) : value;
	}, [stringify, value]);

	return <FormFieldLabel {...rest}>{label}</FormFieldLabel>;
};

FormFieldLabelContainer.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	stringify: PropTypes.func,
};

FormFieldLabelContainer.displayName = "FormFieldLabelContainer";
