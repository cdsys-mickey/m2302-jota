import PropTypes from "prop-types";
import { ControlledTextField } from "./ControlledTextField";
import TypoTextFieldContainer from "./TypoTextFieldContainer";

export const TextFieldWrapper = (props) => {
	const { typo = false, ...rest } = props;

	if (typo) {
		return <TypoTextFieldContainer {...rest} />;
	}

	return <ControlledTextField {...rest} />;
};

TextFieldWrapper.displayName = "TextFieldWrapper";
TextFieldWrapper.propTypes = {
	typo: PropTypes.bool,
	inputRef: PropTypes.object,
};
