import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import REBReportType from "./REBReportType.mjs";

const REBReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={REBReportType.options}
			getOptionLabel={REBReportType.getOptionLabel}
			isOptionEqualToValue={REBReportType.isOptionEqualToValue}
			findByInput={REBReportType.findByInput}
			notFoundText="報表型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
REBReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

REBReportTypePicker.displayName = "REBReportTypePicker";
export default REBReportTypePicker;





