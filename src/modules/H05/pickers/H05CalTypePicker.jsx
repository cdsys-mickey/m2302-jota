import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H05CalType from "./H05CalType.mjs";



const H05CalTypePicker = forwardRef((props, ref) => {
	const { name, label = "百分率算法", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H05CalType.options}
			getOptionLabel={H05CalType.getOptionLabel}
			isOptionEqualToValue={H05CalType.isOptionEqualToValue}
			findByInput={H05CalType.findByInput}
			notFoundText="百分率算法 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H05CalTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H05CalTypePicker.displayName = "H05CalTypePicker";
export default H05CalTypePicker;

