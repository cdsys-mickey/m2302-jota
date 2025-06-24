import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P03ReportType from "./P03ReportType.mjs";

const P03ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P03ReportType.options}
			getOptionLabel={P03ReportType.getOptionLabel}
			isOptionEqualToValue={P03ReportType.isOptionEqualToValue}
			findByInput={P03ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P03ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P03ReportTypePicker.displayName = "P03ReportTypePicker";
export default P03ReportTypePicker;



