import ControlledDateField from "../controlled/ControlledDateField";
import { TypoDateFieldContainer } from "../typo/TypoDateFieldContainer";
import PropTypes from "prop-types";
import { TypoDatePickerContainer } from "../typo/TypoDatePickerContainer";

export const DatePickerWrapper = (props) => {
	const { typo = false, ...rest } = props;

	if (typo) {
		return <TypoDatePickerContainer {...rest} />;
	}

	return <ControlledDateField {...rest} />;
};

DatePickerWrapper.displayName = "DatePickerWrapper";
DatePickerWrapper.propTypes = {
	typo: PropTypes.bool,
};
