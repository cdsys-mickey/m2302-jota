import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H45ReportType from "./H45ReportType.mjs";

const H45ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H45ReportType.options}
			getOptionLabel={H45ReportType.getOptionLabel}
			isOptionEqualToValue={H45ReportType.isOptionEqualToValue}
			findByInput={H45ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H45ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H45ReportTypePicker.displayName = "H45ReportTypePicker";
export default H45ReportTypePicker;







