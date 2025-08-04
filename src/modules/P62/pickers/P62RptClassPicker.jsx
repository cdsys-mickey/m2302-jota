import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P62RptClasses from "./P62RptClasses.mjs";


const P62RptClassPicker = forwardRef((props, ref) => {
	const { name, label = "報表類別", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P62RptClasses.options}
			getOptionLabel={P62RptClasses.getOptionLabel}
			isOptionEqualToValue={P62RptClasses.isOptionEqualToValue}
			findByInput={P62RptClasses.findByInput}
			notFoundText="報表類別 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P62RptClassPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P62RptClassPicker.displayName = "P62RptClassPicker";
export default P62RptClassPicker;












