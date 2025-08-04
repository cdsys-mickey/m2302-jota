import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P63ReportType from "./P63ReportTypes.mjs";

const P63ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "資料型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P63ReportType.options}
			getOptionLabel={P63ReportType.getOptionLabel}
			isOptionEqualToValue={P63ReportType.isOptionEqualToValue}
			findByInput={P63ReportType.findByInput}
			notFoundText="資料型態 ${input} 不存在"
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












