import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H49ReportType from "./H49ReportType.mjs";

const H49ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H49ReportType.options}
			getOptionLabel={H49ReportType.getOptionLabel}
			isOptionEqualToValue={H49ReportType.isOptionEqualToValue}
			findByInput={H49ReportType.findByInput}
			notFoundText="報表型態 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H49ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H49ReportTypePicker.displayName = "H49ReportTypePicker";
export default H49ReportTypePicker;








