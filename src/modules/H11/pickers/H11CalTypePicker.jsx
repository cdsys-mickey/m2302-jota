import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H11CalType from "./H11CalType.mjs";



const H11CalTypePicker = forwardRef((props, ref) => {
	const { name, label = "百分率算法", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H11CalType.options}
			getOptionLabel={H11CalType.getOptionLabel}
			isOptionEqualToValue={H11CalType.isOptionEqualToValue}
			findByInput={H11CalType.findByInput}
			notFoundText="百分率算法 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H11CalTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H11CalTypePicker.displayName = "H11CalTypePicker";
export default H11CalTypePicker;


