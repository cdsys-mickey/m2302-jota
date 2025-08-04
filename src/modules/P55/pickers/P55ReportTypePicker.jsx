import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P55ReportType from "./P55ReportTypes.mjs";

const P55ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "資料型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P55ReportType.options}
			getOptionLabel={P55ReportType.getOptionLabel}
			isOptionEqualToValue={P55ReportType.isOptionEqualToValue}
			findByInput={P55ReportType.findByInput}
			notFoundText="資料型態 ${input} 不存在"
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











