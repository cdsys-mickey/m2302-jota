import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H08ReportType from "./H08ReportType.mjs";

const H08ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H08ReportType.options}
			getOptionLabel={H08ReportType.getOptionLabel}
			isOptionEqualToValue={H08ReportType.isOptionEqualToValue}
			findByInput={H08ReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H08ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H08ReportTypePicker.displayName = "H08ReportTypePicker";
export default H08ReportTypePicker;

