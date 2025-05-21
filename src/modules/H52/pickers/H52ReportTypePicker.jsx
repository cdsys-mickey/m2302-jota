import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H52ReportType from "./H52ReportType.mjs";

const H52ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H52ReportType.options}
			getOptionLabel={H52ReportType.getOptionLabel}
			isOptionEqualToValue={H52ReportType.isOptionEqualToValue}
			findByInput={H52ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H52ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H52ReportTypePicker.displayName = "H52ReportTypePicker";
export default H52ReportTypePicker;








