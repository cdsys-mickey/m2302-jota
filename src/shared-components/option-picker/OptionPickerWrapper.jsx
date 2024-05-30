import { TypoWebApiOptionPickerContainer } from "@/shared-components/typo/TypoWebApiOptionPickerContainer";
import PropTypes from "prop-types";
import { ControlledOptionPicker } from "./ControlledOptionPicker";
import TypoOptionPickerContainer from "./TypoOptionPickerContainer";
import { WebApiOptionPickerWrapper } from "./WebApiOptionPickerWrapper";
import { memo } from "react";
import { ControlledWebApiOptionPicker } from "../controlled/ControlledWebApiOptionPicker";

/**
 * OptionPicker 系列的綜合入口
 * @param {*} props
 * @returns
 */
export const OptionPickerWrapper = memo((props) => {
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
		// <WebApiOptionPickerWrapper url={url} {...rest} />
		<ControlledWebApiOptionPicker url={url} {...rest} />
	) : (
		<ControlledOptionPicker {...rest} />
	);
});

OptionPickerWrapper.displayName = "OptionPickerWrapper";
OptionPickerWrapper.propTypes = {
	typo: PropTypes.bool,
	url: PropTypes.string,
};
