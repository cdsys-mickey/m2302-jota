import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H06CalType from "./H06CalType.mjs";



const H06CalTypePicker = forwardRef((props, ref) => {
	const { name, label = "百分率算法", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H06CalType.options}
			getOptionLabel={H06CalType.getOptionLabel}
			isOptionEqualToValue={H06CalType.isOptionEqualToValue}
			findByInput={H06CalType.findByInput}
			notFoundText="百分率算法 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H06CalTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H06CalTypePicker.displayName = "H06CalTypePicker";
export default H06CalTypePicker;


