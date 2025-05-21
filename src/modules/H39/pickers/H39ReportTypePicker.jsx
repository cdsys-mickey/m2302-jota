import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H39ReportType from "./H39ReportType.mjs";

const H39ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H39ReportType.options}
			getOptionLabel={H39ReportType.getOptionLabel}
			isOptionEqualToValue={H39ReportType.isOptionEqualToValue}
			findByInput={H39ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H39ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H39ReportTypePicker.displayName = "H39ReportTypePicker";
export default H39ReportTypePicker;








