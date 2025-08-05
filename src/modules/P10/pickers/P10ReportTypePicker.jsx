import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P10ReportTypes from "./P10ReportTypes.mjs";

const P10ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P10ReportTypes.options}
			getOptionLabel={P10ReportTypes.getOptionLabel}
			isOptionEqualToValue={P10ReportTypes.isOptionEqualToValue}
			findByInput={P10ReportTypes.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P10ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P10ReportTypePicker.displayName = "P10ReportTypePicker";
export default P10ReportTypePicker;




