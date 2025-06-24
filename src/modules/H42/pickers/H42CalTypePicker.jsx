import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H42CalType from "./H42CalType.mjs";



const H42CalTypePicker = forwardRef((props, ref) => {
	const { name, label = "百分率算法", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H42CalType.options}
			getOptionLabel={H42CalType.getOptionLabel}
			isOptionEqualToValue={H42CalType.isOptionEqualToValue}
			findByInput={H42CalType.findByInput}
			notFoundText="百分率算法 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H42CalTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H42CalTypePicker.displayName = "H42CalTypePicker";
export default H42CalTypePicker;



