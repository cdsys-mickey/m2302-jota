import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H27CalType from "./H27CalType.mjs";



const H27CalTypePicker = forwardRef((props, ref) => {
	const { name, label = "百分率算法", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H27CalType.options}
			getOptionLabel={H27CalType.getOptionLabel}
			isOptionEqualToValue={H27CalType.isOptionEqualToValue}
			findByInput={H27CalType.findByInput}
			notFoundText="百分率算法 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H27CalTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H27CalTypePicker.displayName = "H27CalTypePicker";
export default H27CalTypePicker;



