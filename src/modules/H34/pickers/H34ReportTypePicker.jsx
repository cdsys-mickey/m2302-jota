import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H34ReportType from "./H34ReportType.mjs";

const H34ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H34ReportType.options}
			getOptionLabel={H34ReportType.getOptionLabel}
			isOptionEqualToValue={H34ReportType.isOptionEqualToValue}
			findByInput={H34ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H34ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H34ReportTypePicker.displayName = "H34ReportTypePicker";
export default H34ReportTypePicker;



