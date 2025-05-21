import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H14_1ReportType from "./H14_1ReportType.mjs";

const H14_1ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "統計方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H14_1ReportType.options}
			getOptionLabel={H14_1ReportType.getOptionLabel}
			isOptionEqualToValue={H14_1ReportType.isOptionEqualToValue}
			findByInput={H14_1ReportType.findByInput}
			notFoundText="統計方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H14_1ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H14_1ReportTypePicker.displayName = "H141ReportTypePicker";
export default H14_1ReportTypePicker;


