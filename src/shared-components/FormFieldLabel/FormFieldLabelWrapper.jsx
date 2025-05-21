import PropTypes from "prop-types";
import FormFieldLabelView from "./FormFieldLabelView";
import FormFieldLabelContainer from "./FormFieldLabelContainer";

const FormFieldLabelWrapper = (props) => {
	const { name, ...rest } = props;
	if (name) {
		return <FormFieldLabelContainer name={name} {...rest} />
	}
	return <FormFieldLabelView {...rest} />
}

FormFieldLabelWrapper.displayName = "FormFieldLabelWrapper";
FormFieldLabelWrapper.propTypes = {
	name: PropTypes.string
}
export default FormFieldLabelWrapper;