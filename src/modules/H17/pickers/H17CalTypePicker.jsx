import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H17CalType from "./H17CalType.mjs";



const H17CalTypePicker = forwardRef((props, ref) => {
	const { name, label = "百分率算法", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H17CalType.options}
			getOptionLabel={H17CalType.getOptionLabel}
			isOptionEqualToValue={H17CalType.isOptionEqualToValue}
			findByInput={H17CalType.findByInput}
			notFoundText="百分率算法 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H17CalTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H17CalTypePicker.displayName = "H17CalTypePicker";
export default H17CalTypePicker;


