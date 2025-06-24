import TaxTypes from "@/modules/TaxTypes.mjs";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { OptionPicker } from "@/shared-components";
import Constants from "@/modules/md-constants";

const TaxTypePicker = forwardRef((props, ref) => {
	const { name, label = "稅別", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={TaxTypes.options}
			getOptionLabel={TaxTypes.getOptionLabel}
			isOptionEqualToValue={TaxTypes.isOptionEqualToValue}
			findByInput={TaxTypes.findByInput}
			notFoundText="稅別 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
TaxTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

TaxTypePicker.displayName = "TaxTypePicker";
export default TaxTypePicker;
