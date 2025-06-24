import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H06ReportType from "./H06ReportType.mjs";

const H06ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H06ReportType.options}
			getOptionLabel={H06ReportType.getOptionLabel}
			isOptionEqualToValue={H06ReportType.isOptionEqualToValue}
			findByInput={H06ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H06ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H06ReportTypePicker.displayName = "H06ReportTypePicker";
export default H06ReportTypePicker;



