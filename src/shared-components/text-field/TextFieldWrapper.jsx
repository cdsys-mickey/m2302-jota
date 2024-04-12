import PropTypes from "prop-types";
import TypoTextFieldContainer from "./TypoTextFieldContainer";
import { ControlledTextField } from "../controlled/ControlledTextField";

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
};
