import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H22ReportType from "./H22ReportType.mjs";

const H22ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H22ReportType.options}
			getOptionLabel={H22ReportType.getOptionLabel}
			isOptionEqualToValue={H22ReportType.isOptionEqualToValue}
			findByInput={H22ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H22ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H22ReportTypePicker.displayName = "H22ReportTypePicker";
export default H22ReportTypePicker;


