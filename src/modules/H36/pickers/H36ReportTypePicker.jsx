import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H36ReportType from "./H36ReportType.mjs";

const H36ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H36ReportType.options}
			getOptionLabel={H36ReportType.getOptionLabel}
			isOptionEqualToValue={H36ReportType.isOptionEqualToValue}
			findByInput={H36ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H36ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H36ReportTypePicker.displayName = "H36ReportTypePicker";
export default H36ReportTypePicker;






