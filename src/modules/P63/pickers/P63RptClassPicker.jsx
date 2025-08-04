import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P63RptClasses from "./P63RptClasses.mjs";


const P63RptClassPicker = forwardRef((props, ref) => {
	const { name, label = "報表類別", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P63RptClasses.options}
			getOptionLabel={P63RptClasses.getOptionLabel}
			isOptionEqualToValue={P63RptClasses.isOptionEqualToValue}
			findByInput={P63RptClasses.findByInput}
			notFoundText="報表類別 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P63RptClassPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P63RptClassPicker.displayName = "P63RptClassPicker";
export default P63RptClassPicker;












