import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H14_3CalType from "./H14_3CalType.mjs";



const H14_3CalTypePicker = forwardRef((props, ref) => {
	const { name, label = "百分率算法", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H14_3CalType.options}
			getOptionLabel={H14_3CalType.getOptionLabel}
			isOptionEqualToValue={H14_3CalType.isOptionEqualToValue}
			findByInput={H14_3CalType.findByInput}
			notFoundText="百分率算法 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H14_3CalTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H14_3CalTypePicker.displayName = "H141CalTypePicker";
export default H14_3CalTypePicker;



