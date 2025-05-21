import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H35ReportType from "./H35ReportType.mjs";

const H35ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H35ReportType.options}
			getOptionLabel={H35ReportType.getOptionLabel}
			isOptionEqualToValue={H35ReportType.isOptionEqualToValue}
			findByInput={H35ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H35ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H35ReportTypePicker.displayName = "H35ReportTypePicker";
export default H35ReportTypePicker;





