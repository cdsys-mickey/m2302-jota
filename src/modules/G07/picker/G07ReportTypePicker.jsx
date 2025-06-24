import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import G07ReportType from "./G07ReportType.mjs";

const G07ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={G07ReportType.options}
			getOptionLabel={G07ReportType.getOptionLabel}
			isOptionEqualToValue={G07ReportType.isOptionEqualToValue}
			findByInput={G07ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
G07ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

G07ReportTypePicker.displayName = "G07ReportTypePicker";
export default G07ReportTypePicker;




