import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P63ReportTypes from "./P63ReportTypes.mjs";

const P63ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P63ReportTypes.options}
			getOptionLabel={P63ReportTypes.getOptionLabel}
			isOptionEqualToValue={P63ReportTypes.isOptionEqualToValue}
			findByInput={P63ReportTypes.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P63ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P63ReportTypePicker.displayName = "P63ReportTypePicker";
export default P63ReportTypePicker;












