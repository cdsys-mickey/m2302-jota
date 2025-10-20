import { TypoCheckboxExFieldContainer } from "./TypoCheckboxExFieldContainer";
import PropTypes from "prop-types";
import ControlledCheckboxExField from "./ControlledCheckboxExField";
const CheckboxExFieldWrapper = (props) => {
	const { typo, getLabel, ...rest } = props;

	if (typo) {
		return <TypoCheckboxExFieldContainer getLabel={getLabel} {...rest} />;
	}

	return <ControlledCheckboxExField {...rest} />;
};

CheckboxExFieldWrapper.propTypes = {
	typo: PropTypes.bool,
	getLabel: PropTypes.func,
};
CheckboxExFieldWrapper.displayName = "CheckboxExFieldWrapper";
export default CheckboxExFieldWrapper;
