import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H51CalType from "./H51CalType.mjs";



const H51CalTypePicker = forwardRef((props, ref) => {
	const { name, label = "百分率算法", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H51CalType.options}
			getOptionLabel={H51CalType.getOptionLabel}
			isOptionEqualToValue={H51CalType.isOptionEqualToValue}
			findByInput={H51CalType.findByInput}
			notFoundText="百分率算法 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H51CalTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H51CalTypePicker.displayName = "H51CalTypePicker";
export default H51CalTypePicker;



