import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H10CalType from "./H10CalType.mjs";



const H10CalTypePicker = forwardRef((props, ref) => {
	const { name, label = "百分率算法", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H10CalType.options}
			getOptionLabel={H10CalType.getOptionLabel}
			isOptionEqualToValue={H10CalType.isOptionEqualToValue}
			findByInput={H10CalType.findByInput}
			notFoundText="百分率算法 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H10CalTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H10CalTypePicker.displayName = "H10CalTypePicker";
export default H10CalTypePicker;

