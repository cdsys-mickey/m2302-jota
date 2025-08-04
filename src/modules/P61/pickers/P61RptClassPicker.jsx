import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P61RptClasses from "./P61RptClasses.mjs";


const P61RptClassPicker = forwardRef((props, ref) => {
	const { name, label = "報表類別", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P61RptClasses.options}
			getOptionLabel={P61RptClasses.getOptionLabel}
			isOptionEqualToValue={P61RptClasses.isOptionEqualToValue}
			findByInput={P61RptClasses.findByInput}
			notFoundText="報表類別 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P61RptClassPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P61RptClassPicker.displayName = "P61RptClassPicker";
export default P61RptClassPicker;











