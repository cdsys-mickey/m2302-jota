import PropTypes from "prop-types";
import ControlledTimePicker from "./ControlledTimePicker";
import { TypoTimePickerContainer } from "./TypoTimePickerContainer";

const TimePickerWrapper = (props) => {
	const { typo = false, size = "small", ...rest } = props;

	if (typo) {
		return <TypoTimePickerContainer size={size} {...rest} />;
	}

	return <ControlledTimePicker size={size} {...rest} />;
};

TimePickerWrapper.displayName = "TimePickerWrapper";
TimePickerWrapper.propTypes = {
	typo: PropTypes.bool,
	size: PropTypes.string,
};
export default TimePickerWrapper;