import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P03CalType from "./P03CalType.mjs";



const P03CalTypePicker = forwardRef((props, ref) => {
	const { name, label = "百分率算法", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={P03CalType.options}
			getOptionLabel={P03CalType.getOptionLabel}
			isOptionEqualToValue={P03CalType.isOptionEqualToValue}
			findByInput={P03CalType.findByInput}
			notFoundText="百分率算法 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P03CalTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P03CalTypePicker.displayName = "P03CalTypePicker";
export default P03CalTypePicker;


