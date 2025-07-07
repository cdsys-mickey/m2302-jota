import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H14_3ReportType from "./H14_3ReportType.mjs";

const H14_3ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "統計方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H14_3ReportType.options}
			getOptionLabel={H14_3ReportType.getOptionLabel}
			isOptionEqualToValue={H14_3ReportType.isOptionEqualToValue}
			findByInput={H14_3ReportType.findByInput}
			notFoundText="統計方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H14_3ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H14_3ReportTypePicker.displayName = "H141ReportTypePicker";
export default H14_3ReportTypePicker;



