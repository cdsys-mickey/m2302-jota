import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H15ReportType from "./H15ReportType.mjs";

const H15ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H15ReportType.options}
			getOptionLabel={H15ReportType.getOptionLabel}
			isOptionEqualToValue={H15ReportType.isOptionEqualToValue}
			findByInput={H15ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H15ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H15ReportTypePicker.displayName = "H15ReportTypePicker";
export default H15ReportTypePicker;


