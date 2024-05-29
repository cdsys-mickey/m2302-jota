import PropTypes from "prop-types";
import { ControlledOptionPicker } from "../controlled/ControlledOptionPicker";
import TypoOptionPickerContainer from "./TypoOptionPickerContainer";

export const ZZOptionPickerContainer = (props) => {
	const { typo = false, ...rest } = props;

	if (!typo) {
		return <ControlledOptionPicker {...rest} />;
	}

	return <TypoOptionPickerContainer {...rest} />;
};

ZZOptionPickerContainer.displayName = "ZZOptionPickerContainer";
ZZOptionPickerContainer.propTypes = {
	typo: PropTypes.bool,
};
