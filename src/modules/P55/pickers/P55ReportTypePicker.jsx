import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P55ReportTypes from "./P55ReportTypes.mjs";

const P55ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P55ReportTypes.options}
			getOptionLabel={P55ReportTypes.getOptionLabel}
			isOptionEqualToValue={P55ReportTypes.isOptionEqualToValue}
			findByInput={P55ReportTypes.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P55ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P55ReportTypePicker.displayName = "P55ReportTypePicker";
export default P55ReportTypePicker;











