import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H11ReportType from "./H11ReportType.mjs";

const H11ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H11ReportType.options}
			getOptionLabel={H11ReportType.getOptionLabel}
			isOptionEqualToValue={H11ReportType.isOptionEqualToValue}
			findByInput={H11ReportType.findByInput}
			notFoundText="報表型態 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H11ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H11ReportTypePicker.displayName = "H11ReportTypePicker";
export default H11ReportTypePicker;


