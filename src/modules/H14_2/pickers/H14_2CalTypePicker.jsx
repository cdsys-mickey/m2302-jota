import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H14_2CalType from "./H14_2CalType.mjs";



const H14_2CalTypePicker = forwardRef((props, ref) => {
	const { name, label = "百分率算法", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H14_2CalType.options}
			getOptionLabel={H14_2CalType.getOptionLabel}
			isOptionEqualToValue={H14_2CalType.isOptionEqualToValue}
			findByInput={H14_2CalType.findByInput}
			notFoundText="百分率算法 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H14_2CalTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H14_2CalTypePicker.displayName = "H141CalTypePicker";
export default H14_2CalTypePicker;



