import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H16ReportType from "./H16ReportType.mjs";

const H16ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H16ReportType.options}
			getOptionLabel={H16ReportType.getOptionLabel}
			isOptionEqualToValue={H16ReportType.isOptionEqualToValue}
			findByInput={H16ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H16ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H16ReportTypePicker.displayName = "H16ReportTypePicker";
export default H16ReportTypePicker;


