import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H141ReportType from "./H141ReportType.mjs";

const H141ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "統計方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H141ReportType.options}
			getOptionLabel={H141ReportType.getOptionLabel}
			isOptionEqualToValue={H141ReportType.isOptionEqualToValue}
			findByInput={H141ReportType.findByInput}
			notFoundText="統計方式 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H141ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H141ReportTypePicker.displayName = "H141ReportTypePicker";
export default H141ReportTypePicker;


