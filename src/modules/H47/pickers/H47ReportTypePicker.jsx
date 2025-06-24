import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H47ReportType from "./H47ReportType.mjs";

const H47ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H47ReportType.options}
			getOptionLabel={H47ReportType.getOptionLabel}
			isOptionEqualToValue={H47ReportType.isOptionEqualToValue}
			findByInput={H47ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H47ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H47ReportTypePicker.displayName = "H47ReportTypePicker";
export default H47ReportTypePicker;



