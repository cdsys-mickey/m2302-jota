import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P56ReportTypes from "./P56ReportTypes.mjs";

const P56ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "資料型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P56ReportTypes.options}
			getOptionLabel={P56ReportTypes.getOptionLabel}
			isOptionEqualToValue={P56ReportTypes.isOptionEqualToValue}
			findByInput={P56ReportTypes.findByInput}
			notFoundText="資料型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P56ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P56ReportTypePicker.displayName = "P56ReportTypePicker";
export default P56ReportTypePicker;











