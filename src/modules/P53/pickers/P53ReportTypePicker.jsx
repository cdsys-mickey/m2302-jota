import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P53ReportType from "./P53ReportType.mjs";

const P53ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P53ReportType.options}
			getOptionLabel={P53ReportType.getOptionLabel}
			isOptionEqualToValue={P53ReportType.isOptionEqualToValue}
			findByInput={P53ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P53ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P53ReportTypePicker.displayName = "P53ReportTypePicker";
export default P53ReportTypePicker;

