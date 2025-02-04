import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H10ReportType from "./H10ReportType.mjs";

const H10ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H10ReportType.options}
			getOptionLabel={H10ReportType.getOptionLabel}
			isOptionEqualToValue={H10ReportType.isOptionEqualToValue}
			findByInput={H10ReportType.findByInput}
			notFoundText="報表型態 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H10ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H10ReportTypePicker.displayName = "H10ReportTypePicker";
export default H10ReportTypePicker;

