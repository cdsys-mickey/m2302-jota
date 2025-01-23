import { TypoWebApiOptionPickerContainer } from "@/shared-components/typo/TypoWebApiOptionPickerContainer";
import PropTypes from "prop-types";
import { memo } from "react";
import { ControlledWebApiOptionPicker } from "../controlled/ControlledWebApiOptionPicker";
import { ControlledOptionPicker } from "./ControlledOptionPicker";
import TypoOptionPickerContainer from "./TypoOptionPickerContainer";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useContext } from "react";
import { useMemo } from "react";

/**
 * OptionPicker 系列的綜合入口
 * @param {*} props
 * @returns
 */
export const OptionPickerWrapper = memo((props) => {
	const { typo = false, url, blurToLookup, ...rest } = props;
	const dsg = useContext(DSGContext);
	const inDSG = !!dsg;

	const _blurToLookup = useMemo(() => {
		return blurToLookup != null ? blurToLookup : !inDSG;
	}, [blurToLookup, inDSG])

	// console.log("rendering OptionPickerWrapper");
	// if (typo) {
	// 	return <TypoWebApiOptionPickerContainer url={url} {...rest} />
	// }
	// return <ControlledWebApiOptionPicker url={url} {...rest} />;
	if (typo) {
		return url ? (
			<TypoWebApiOptionPickerContainer url={url} blurToLookup={_blurToLookup} {...rest} />
		) : (
			<TypoOptionPickerContainer blurToLookup={_blurToLookup} {...rest} />
		);
	}
	return url ? (
		<ControlledWebApiOptionPicker url={url} blurToLookup={_blurToLookup} {...rest} />
	) : (
		<ControlledOptionPicker blurToLookup={_blurToLookup} {...rest} />
	);
});

OptionPickerWrapper.displayName = "OptionPickerWrapper";
OptionPickerWrapper.propTypes = {
	typo: PropTypes.bool,
	url: PropTypes.string,
};
