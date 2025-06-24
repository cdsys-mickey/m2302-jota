import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H05ReportType from "./H05ReportType.mjs";

const H05ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H05ReportType.options}
			getOptionLabel={H05ReportType.getOptionLabel}
			isOptionEqualToValue={H05ReportType.isOptionEqualToValue}
			findByInput={H05ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H05ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H05ReportTypePicker.displayName = "H05ReportTypePicker";
export default H05ReportTypePicker;


