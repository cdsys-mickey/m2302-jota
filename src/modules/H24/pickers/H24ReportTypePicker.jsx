import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H24ReportType from "./H24ReportType.mjs";

const H24ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H24ReportType.options}
			getOptionLabel={H24ReportType.getOptionLabel}
			isOptionEqualToValue={H24ReportType.isOptionEqualToValue}
			findByInput={H24ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H24ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H24ReportTypePicker.displayName = "H24ReportTypePicker";
export default H24ReportTypePicker;
