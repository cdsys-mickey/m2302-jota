import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P57ReportType from "./P57ReportTypes.mjs";

const P57ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "資料型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P57ReportType.options}
			getOptionLabel={P57ReportType.getOptionLabel}
			isOptionEqualToValue={P57ReportType.isOptionEqualToValue}
			findByInput={P57ReportType.findByInput}
			notFoundText="資料型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P57ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P57ReportTypePicker.displayName = "P57ReportTypePicker";
export default P57ReportTypePicker;











