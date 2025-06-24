import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H42ReportType from "./H42ReportType.mjs";

const H42ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H42ReportType.options}
			getOptionLabel={H42ReportType.getOptionLabel}
			isOptionEqualToValue={H42ReportType.isOptionEqualToValue}
			findByInput={H42ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H42ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H42ReportTypePicker.displayName = "H42ReportTypePicker";
export default H42ReportTypePicker;



