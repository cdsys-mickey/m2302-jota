import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H53ReportType from "./H53ReportType.mjs";

const H53ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H53ReportType.options}
			getOptionLabel={H53ReportType.getOptionLabel}
			isOptionEqualToValue={H53ReportType.isOptionEqualToValue}
			findByInput={H53ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H53ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H53ReportTypePicker.displayName = "H53ReportTypePicker";
export default H53ReportTypePicker;









