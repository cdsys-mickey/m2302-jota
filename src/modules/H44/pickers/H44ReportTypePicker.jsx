import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H44ReportType from "./H44ReportType.mjs";

const H44ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H44ReportType.options}
			getOptionLabel={H44ReportType.getOptionLabel}
			isOptionEqualToValue={H44ReportType.isOptionEqualToValue}
			findByInput={H44ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H44ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H44ReportTypePicker.displayName = "H44ReportTypePicker";
export default H44ReportTypePicker;


