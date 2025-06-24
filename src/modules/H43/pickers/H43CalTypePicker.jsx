import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H43CalType from "./H43CalType.mjs";



const H43CalTypePicker = forwardRef((props, ref) => {
	const { name, label = "百分率算法", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H43CalType.options}
			getOptionLabel={H43CalType.getOptionLabel}
			isOptionEqualToValue={H43CalType.isOptionEqualToValue}
			findByInput={H43CalType.findByInput}
			notFoundText="百分率算法 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H43CalTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H43CalTypePicker.displayName = "H43CalTypePicker";
export default H43CalTypePicker;




