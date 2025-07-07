import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H14_2ReportType from "./H14_2ReportType.mjs";

const H14_2ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "統計方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H14_2ReportType.options}
			getOptionLabel={H14_2ReportType.getOptionLabel}
			isOptionEqualToValue={H14_2ReportType.isOptionEqualToValue}
			findByInput={H14_2ReportType.findByInput}
			notFoundText="統計方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H14_2ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H14_2ReportTypePicker.displayName = "H141ReportTypePicker";
export default H14_2ReportTypePicker;



