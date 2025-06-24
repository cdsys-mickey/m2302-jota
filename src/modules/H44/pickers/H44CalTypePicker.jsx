import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H44CalType from "./H44CalType.mjs";



const H44CalTypePicker = forwardRef((props, ref) => {
	const { name, label = "百分率算法", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H44CalType.options}
			getOptionLabel={H44CalType.getOptionLabel}
			isOptionEqualToValue={H44CalType.isOptionEqualToValue}
			findByInput={H44CalType.findByInput}
			notFoundText="百分率算法 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H44CalTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H44CalTypePicker.displayName = "H44CalTypePicker";
export default H44CalTypePicker;


