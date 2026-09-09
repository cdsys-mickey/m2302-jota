import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H07AReportType from "./H07AReportType.mjs";

const H07AReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H07AReportType.options}
			getOptionLabel={H07AReportType.getOptionLabel}
			isOptionEqualToValue={H07AReportType.isOptionEqualToValue}
			findByInput={H07AReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H07AReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H07AReportTypePicker.displayName = "H07AReportTypePicker";
export default H07AReportTypePicker;


