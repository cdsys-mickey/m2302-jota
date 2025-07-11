import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P51ReportType from "./P51ReportType.mjs";

const P51ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P51ReportType.options}
			getOptionLabel={P51ReportType.getOptionLabel}
			isOptionEqualToValue={P51ReportType.isOptionEqualToValue}
			findByInput={P51ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P51ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P51ReportTypePicker.displayName = "P51ReportTypePicker";
export default P51ReportTypePicker;









