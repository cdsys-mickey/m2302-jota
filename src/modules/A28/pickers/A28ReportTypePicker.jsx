import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import A28ReportTypes from "./A28ReportTypes.mjs";

const A28ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={A28ReportTypes.options}
			getOptionLabel={A28ReportTypes.getOptionLabel}
			isOptionEqualToValue={A28ReportTypes.isOptionEqualToValue}
			findByInput={A28ReportTypes.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
A28ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

A28ReportTypePicker.displayName = "A28ReportTypePicker";
export default A28ReportTypePicker;












