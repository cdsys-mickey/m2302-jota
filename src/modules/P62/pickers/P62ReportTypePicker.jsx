import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P62ReportTypes from "./P62ReportTypes.mjs";

const P62ReportTypePicker = forwardRef((props, ref) => {
	const { name, label = "報表類型", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P62ReportTypes.options}
			getOptionLabel={P62ReportTypes.getOptionLabel}
			isOptionEqualToValue={P62ReportTypes.isOptionEqualToValue}
			findByInput={P62ReportTypes.findByInput}
			notFoundText="報表類型 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P62ReportTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P62ReportTypePicker.displayName = "P62ReportTypePicker";
export default P62ReportTypePicker;












