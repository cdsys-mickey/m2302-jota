import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H13ReportType from "./H13ReportType.mjs";

const H13ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H13ReportType.options}
			getOptionLabel={H13ReportType.getOptionLabel}
			isOptionEqualToValue={H13ReportType.isOptionEqualToValue}
			findByInput={H13ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H13ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H13ReportTypePicker.displayName = "H13ReportTypePicker";
export default H13ReportTypePicker;


