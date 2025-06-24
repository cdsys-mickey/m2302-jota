import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H50ReportType from "./H50ReportType.mjs";

const H50ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H50ReportType.options}
			getOptionLabel={H50ReportType.getOptionLabel}
			isOptionEqualToValue={H50ReportType.isOptionEqualToValue}
			findByInput={H50ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H50ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H50ReportTypePicker.displayName = "H50ReportTypePicker";
export default H50ReportTypePicker;







