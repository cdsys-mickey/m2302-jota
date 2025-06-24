import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H16CalType from "./H16CalType.mjs";



const H16CalTypePicker = forwardRef((props, ref) => {
	const { name, label = "百分率算法", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H16CalType.options}
			getOptionLabel={H16CalType.getOptionLabel}
			isOptionEqualToValue={H16CalType.isOptionEqualToValue}
			findByInput={H16CalType.findByInput}
			notFoundText="百分率算法 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H16CalTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H16CalTypePicker.displayName = "H16CalTypePicker";
export default H16CalTypePicker;


