import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H35CalType from "./H35CalType.mjs";



const H35CalTypePicker = forwardRef((props, ref) => {
	const { name, label = "百分率算法", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H35CalType.options}
			getOptionLabel={H35CalType.getOptionLabel}
			isOptionEqualToValue={H35CalType.isOptionEqualToValue}
			findByInput={H35CalType.findByInput}
			notFoundText="百分率算法 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H35CalTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H35CalTypePicker.displayName = "H35CalTypePicker";
export default H35CalTypePicker;





