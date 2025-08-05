import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P51ReportTypes from "./P51ReportTypes.mjs";

const P51ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P51ReportTypes.options}
			getOptionLabel={P51ReportTypes.getOptionLabel}
			isOptionEqualToValue={P51ReportTypes.isOptionEqualToValue}
			findByInput={P51ReportTypes.findByInput}
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









