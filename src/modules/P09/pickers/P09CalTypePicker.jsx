import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P09CalType from "./P09CalType.mjs";



const P09CalTypePicker = forwardRef((props, ref) => {
	const { name, label = "百分率算法", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={P09CalType.options}
			getOptionLabel={P09CalType.getOptionLabel}
			isOptionEqualToValue={P09CalType.isOptionEqualToValue}
			findByInput={P09CalType.findByInput}
			notFoundText="百分率算法 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P09CalTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P09CalTypePicker.displayName = "P09CalTypePicker";
export default P09CalTypePicker;



