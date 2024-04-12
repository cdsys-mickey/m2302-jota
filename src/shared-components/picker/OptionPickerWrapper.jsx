import { TypoWebApiOptionPickerContainer } from "@/shared-components/typo/TypoWebApiOptionPickerContainer";
import PropTypes from "prop-types";
import { ControlledOptionPicker } from "../controlled/ControlledOptionPicker";
import TypoOptionPickerContainer from "./TypoOptionPickerContainer";
import { WebApiOptionPickerWrapper } from "./WebApiOptionPickerWrapper";

/**
 * OptionPicker 系列的綜合入口
 * @param {*} props
 * @returns
 */
export const OptionPickerWrapper = (props) => {
	const { typo = false, url, ...rest } = props;
	// console.log("rendering OptionPickerWrapper");

	if (typo) {
		return url ? (
			<TypoWebApiOptionPickerContainer url={url} {...rest} />
		) : (
			<TypoOptionPickerContainer {...rest} />
		);
	}
	return url ? (
		<WebApiOptionPickerWrapper url={url} {...rest} />
	) : (
		<ControlledOptionPicker {...rest} />
	);
};

OptionPickerWrapper.displayName = "OptionPickerWrapper";
OptionPickerWrapper.propTypes = {
	typo: PropTypes.bool,
	url: PropTypes.string,
};
