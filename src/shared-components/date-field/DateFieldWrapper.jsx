import ControlledDateField from "../controlled/ControlledDateField";
import { TypoDateFieldContainer } from "../typo/TypoDateFieldContainer";
import PropTypes from "prop-types";

export const DateFieldWrapper = (props) => {
	const { typo = false, ...rest } = props;

	if (typo) {
		return <TypoDateFieldContainer {...rest} />;
	}

	return <ControlledDateField {...rest} />;
};

DateFieldWrapper.displayName = "DateFieldWrapper";
DateFieldWrapper.propTypes = {
	typo: PropTypes.bool,
};
