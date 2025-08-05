import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P58ReportTypes from "./P58ReportTypes.mjs";

const P58ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "資料型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P58ReportTypes.options}
			getOptionLabel={P58ReportTypes.getOptionLabel}
			isOptionEqualToValue={P58ReportTypes.isOptionEqualToValue}
			findByInput={P58ReportTypes.findByInput}
			notFoundText="資料型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P58ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P58ReportTypePicker.displayName = "P58ReportTypePicker";
export default P58ReportTypePicker;











