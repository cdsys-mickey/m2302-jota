import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import G05ReportType from "./G05ReportType.mjs";

const G05ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={G05ReportType.options}
			getOptionLabel={G05ReportType.getOptionLabel}
			isOptionEqualToValue={G05ReportType.isOptionEqualToValue}
			findByInput={G05ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
G05ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

G05ReportTypePicker.displayName = "G05ReportTypePicker";
export default G05ReportTypePicker;

