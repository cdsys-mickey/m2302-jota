import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H40ReportType from "./H40ReportType.mjs";

const H40ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H40ReportType.options}
			getOptionLabel={H40ReportType.getOptionLabel}
			isOptionEqualToValue={H40ReportType.isOptionEqualToValue}
			findByInput={H40ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H40ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H40ReportTypePicker.displayName = "H40ReportTypePicker";
export default H40ReportTypePicker;







