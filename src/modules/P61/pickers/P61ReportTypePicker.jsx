import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P61ReportType from "./P61ReportTypes.mjs";

const P61ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "資料型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P61ReportType.options}
			getOptionLabel={P61ReportType.getOptionLabel}
			isOptionEqualToValue={P61ReportType.isOptionEqualToValue}
			findByInput={P61ReportType.findByInput}
			notFoundText="資料型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P61ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P61ReportTypePicker.displayName = "P61ReportTypePicker";
export default P61ReportTypePicker;











