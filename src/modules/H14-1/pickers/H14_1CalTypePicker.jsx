import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H14_1CalType from "./H14_1CalType.mjs";



const H14_1CalTypePicker = forwardRef((props, ref) => {
	const { name, label = "百分率算法", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H14_1CalType.options}
			getOptionLabel={H14_1CalType.getOptionLabel}
			isOptionEqualToValue={H14_1CalType.isOptionEqualToValue}
			findByInput={H14_1CalType.findByInput}
			notFoundText="百分率算法 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H14_1CalTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H14_1CalTypePicker.displayName = "H141CalTypePicker";
export default H14_1CalTypePicker;


