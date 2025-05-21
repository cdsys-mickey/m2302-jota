import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H43ReportType from "./H43ReportType.mjs";

const H43ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H43ReportType.options}
			getOptionLabel={H43ReportType.getOptionLabel}
			isOptionEqualToValue={H43ReportType.isOptionEqualToValue}
			findByInput={H43ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H43ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H43ReportTypePicker.displayName = "H43ReportTypePicker";
export default H43ReportTypePicker;




