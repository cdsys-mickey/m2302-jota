import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H04ReportType from "./H04ReportType.mjs";

const H04ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H04ReportType.options}
			getOptionLabel={H04ReportType.getOptionLabel}
			isOptionEqualToValue={H04ReportType.isOptionEqualToValue}
			findByInput={H04ReportType.findByInput}
			notFoundText="報表型態 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H04ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H04ReportTypePicker.displayName = "H04ReportTypePicker";
export default H04ReportTypePicker;
