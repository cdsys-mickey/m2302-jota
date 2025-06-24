import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H26ReportType from "./H26ReportType.mjs";

const H26ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H26ReportType.options}
			getOptionLabel={H26ReportType.getOptionLabel}
			isOptionEqualToValue={H26ReportType.isOptionEqualToValue}
			findByInput={H26ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H26ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H26ReportTypePicker.displayName = "H26ReportTypePicker";
export default H26ReportTypePicker;



