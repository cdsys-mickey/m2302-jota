import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H04CalType from "./H04CalType.mjs";



const H04CalTypePicker = forwardRef((props, ref) => {
	const { name, label = "百分率算法", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H04CalType.options}
			getOptionLabel={H04CalType.getOptionLabel}
			isOptionEqualToValue={H04CalType.isOptionEqualToValue}
			findByInput={H04CalType.findByInput}
			notFoundText="百分率算法 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H04CalTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H04CalTypePicker.displayName = "H04CalTypePicker";
export default H04CalTypePicker;
