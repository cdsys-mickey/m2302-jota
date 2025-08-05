import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P54ReportTypes from "./P54ReportTypes.mjs";

const P54ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P54ReportTypes.options}
			getOptionLabel={P54ReportTypes.getOptionLabel}
			isOptionEqualToValue={P54ReportTypes.isOptionEqualToValue}
			findByInput={P54ReportTypes.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P54ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P54ReportTypePicker.displayName = "P54ReportTypePicker";
export default P54ReportTypePicker;











