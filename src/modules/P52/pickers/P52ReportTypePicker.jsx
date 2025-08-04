import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P52ReportType from "./P52ReportTypes.mjs";

const P52ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "資料型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P52ReportType.options}
			getOptionLabel={P52ReportType.getOptionLabel}
			isOptionEqualToValue={P52ReportType.isOptionEqualToValue}
			findByInput={P52ReportType.findByInput}
			notFoundText="資料型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P52ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P52ReportTypePicker.displayName = "P52ReportTypePicker";
export default P52ReportTypePicker;










