import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P10ReportType from "./P10ReportType.mjs";

const P10ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={P10ReportType.options}
			getOptionLabel={P10ReportType.getOptionLabel}
			isOptionEqualToValue={P10ReportType.isOptionEqualToValue}
			findByInput={P10ReportType.findByInput}
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




