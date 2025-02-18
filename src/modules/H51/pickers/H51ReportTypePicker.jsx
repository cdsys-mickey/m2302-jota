import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H51ReportType from "./H51ReportType.mjs";

const H51ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H51ReportType.options}
			getOptionLabel={H51ReportType.getOptionLabel}
			isOptionEqualToValue={H51ReportType.isOptionEqualToValue}
			findByInput={H51ReportType.findByInput}
			notFoundText="報表型態 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H51ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H51ReportTypePicker.displayName = "H51ReportTypePicker";
export default H51ReportTypePicker;



