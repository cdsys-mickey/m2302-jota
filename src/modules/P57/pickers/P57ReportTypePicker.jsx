import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P57ReportTypes from "./P57ReportTypes.mjs";

const P57ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "資料型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P57ReportTypes.options}
			getOptionLabel={P57ReportTypes.getOptionLabel}
			isOptionEqualToValue={P57ReportTypes.isOptionEqualToValue}
			findByInput={P57ReportTypes.findByInput}
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











