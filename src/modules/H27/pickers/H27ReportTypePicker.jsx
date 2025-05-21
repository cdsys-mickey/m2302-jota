import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H27ReportType from "./H27ReportType.mjs";

const H27ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H27ReportType.options}
			getOptionLabel={H27ReportType.getOptionLabel}
			isOptionEqualToValue={H27ReportType.isOptionEqualToValue}
			findByInput={H27ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H27ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H27ReportTypePicker.displayName = "H27ReportTypePicker";
export default H27ReportTypePicker;



