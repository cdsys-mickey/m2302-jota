import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H41ReportType from "./H41ReportType.mjs";

const H41ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H41ReportType.options}
			getOptionLabel={H41ReportType.getOptionLabel}
			isOptionEqualToValue={H41ReportType.isOptionEqualToValue}
			findByInput={H41ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H41ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H41ReportTypePicker.displayName = "H41ReportTypePicker";
export default H41ReportTypePicker;







