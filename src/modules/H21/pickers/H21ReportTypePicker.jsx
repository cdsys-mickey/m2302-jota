import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H21ReportType from "./H21ReportType.mjs";

const H21ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H21ReportType.options}
			getOptionLabel={H21ReportType.getOptionLabel}
			isOptionEqualToValue={H21ReportType.isOptionEqualToValue}
			findByInput={H21ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H21ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H21ReportTypePicker.displayName = "H21ReportTypePicker";
export default H21ReportTypePicker;
