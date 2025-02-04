import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H07ReportType from "./H07ReportType.mjs";

const H07ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H07ReportType.options}
			getOptionLabel={H07ReportType.getOptionLabel}
			isOptionEqualToValue={H07ReportType.isOptionEqualToValue}
			findByInput={H07ReportType.findByInput}
			notFoundText="報表型態 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H07ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H07ReportTypePicker.displayName = "H07ReportTypePicker";
export default H07ReportTypePicker;

