import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P09ReportType from "./P09ReportType.mjs";

const P09ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P09ReportType.options}
			getOptionLabel={P09ReportType.getOptionLabel}
			isOptionEqualToValue={P09ReportType.isOptionEqualToValue}
			findByInput={P09ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P09ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P09ReportTypePicker.displayName = "P09ReportTypePicker";
export default P09ReportTypePicker;



