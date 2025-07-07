import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P38CalType from "./P38CalType.mjs";



const P38CalTypePicker = forwardRef((props, ref) => {
	const { name, label = "佣金計算", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P38CalType.options}
			getOptionLabel={P38CalType.getOptionLabel}
			isOptionEqualToValue={P38CalType.isOptionEqualToValue}
			findByInput={P38CalType.findByInput}
			notFoundText="佣金計算方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P38CalTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P38CalTypePicker.displayName = "P38CalTypePicker";
export default P38CalTypePicker;
