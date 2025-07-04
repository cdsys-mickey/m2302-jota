import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import G09ReportType from "./G09ReportType.mjs";

const G09ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={G09ReportType.options}
			getOptionLabel={G09ReportType.getOptionLabel}
			isOptionEqualToValue={G09ReportType.isOptionEqualToValue}
			findByInput={G09ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
G09ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

G09ReportTypePicker.displayName = "G09ReportTypePicker";
export default G09ReportTypePicker;


