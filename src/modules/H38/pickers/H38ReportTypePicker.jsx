import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H38ReportType from "./H38ReportType.mjs";

const H38ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H38ReportType.options}
			getOptionLabel={H38ReportType.getOptionLabel}
			isOptionEqualToValue={H38ReportType.isOptionEqualToValue}
			findByInput={H38ReportType.findByInput}
			notFoundText="報表型態 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H38ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H38ReportTypePicker.displayName = "H38ReportTypePicker";
export default H38ReportTypePicker;







