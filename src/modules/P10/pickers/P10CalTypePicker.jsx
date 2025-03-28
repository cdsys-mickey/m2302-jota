import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P10CalType from "./P10CalType.mjs";



const P10CalTypePicker = forwardRef((props, ref) => {
	const { name, label = "百分率算法", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={P10CalType.options}
			getOptionLabel={P10CalType.getOptionLabel}
			isOptionEqualToValue={P10CalType.isOptionEqualToValue}
			findByInput={P10CalType.findByInput}
			notFoundText="百分率算法 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P10CalTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P10CalTypePicker.displayName = "P10CalTypePicker";
export default P10CalTypePicker;




