import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import A28OrderTypes from "./A28OrderTypes.mjs";


const A28OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "明細型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={A28OrderTypes.options}
			getOptionLabel={A28OrderTypes.getOptionLabel}
			isOptionEqualToValue={A28OrderTypes.isOptionEqualToValue}
			findByInput={A28OrderTypes.findByInput}
			notFoundText="明細型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
A28OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

A28OrderTypePicker.displayName = "A28OrderTypePicker";
export default A28OrderTypePicker;












