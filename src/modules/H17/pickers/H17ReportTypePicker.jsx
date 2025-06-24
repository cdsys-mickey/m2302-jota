import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H17ReportType from "./H17ReportType.mjs";

const H17ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H17ReportType.options}
			getOptionLabel={H17ReportType.getOptionLabel}
			isOptionEqualToValue={H17ReportType.isOptionEqualToValue}
			findByInput={H17ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H17ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H17ReportTypePicker.displayName = "H17ReportTypePicker";
export default H17ReportTypePicker;


