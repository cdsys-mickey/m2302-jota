import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H37ReportType from "./H37ReportType.mjs";

const H37ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表型態", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H37ReportType.options}
			getOptionLabel={H37ReportType.getOptionLabel}
			isOptionEqualToValue={H37ReportType.isOptionEqualToValue}
			findByInput={H37ReportType.findByInput}
			notFoundText="報表型態 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H37ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H37ReportTypePicker.displayName = "H37ReportTypePicker";
export default H37ReportTypePicker;

