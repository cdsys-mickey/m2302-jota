import PropTypes from "prop-types";
import { TypoDatePickerContainer } from "./TypoDatePickerContainer";
import ControlledDatePicker from "./ControlledDatePicker";

export const DatePickerWrapper = (props) => {
	const { typo = false, size = "small", ...rest } = props;

	if (typo) {
		return <TypoDatePickerContainer size={size} {...rest} />;
	}

	return <ControlledDatePicker size={size} {...rest} />;
};

DatePickerWrapper.displayName = "DatePickerWrapper";
DatePickerWrapper.propTypes = {
	typo: PropTypes.bool,
	size: PropTypes.string,
};
