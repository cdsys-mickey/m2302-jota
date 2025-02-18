import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H46ReportType from "./H46ReportType.mjs";

const H46ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H46ReportType.options}
			getOptionLabel={H46ReportType.getOptionLabel}
			isOptionEqualToValue={H46ReportType.isOptionEqualToValue}
			findByInput={H46ReportType.findByInput}
			notFoundText="報表型態 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H46ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H46ReportTypePicker.displayName = "H46ReportTypePicker";
export default H46ReportTypePicker;


