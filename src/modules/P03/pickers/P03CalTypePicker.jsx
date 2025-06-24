import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P03CalType from "./P03CalType.mjs";



const P03CalTypePicker = forwardRef((props, ref) => {
	const { name, label = "百分率算法", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P03CalType.options}
			getOptionLabel={P03CalType.getOptionLabel}
			isOptionEqualToValue={P03CalType.isOptionEqualToValue}
			findByInput={P03CalType.findByInput}
			notFoundText="百分率算法 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P03CalTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P03CalTypePicker.displayName = "P03CalTypePicker";
export default P03CalTypePicker;


