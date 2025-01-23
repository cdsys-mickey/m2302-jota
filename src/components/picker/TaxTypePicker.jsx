import TaxTypes from "@/modules/md-tax-types";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import Constants from "@/modules/md-constants";

const TaxTypePicker = forwardRef((props, ref) => {
	const { name, label = "稅別", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={TaxTypes.options}
			getOptionLabel={TaxTypes.getOptionLabel}
			isOptionEqualToValue={TaxTypes.isOptionEqualToValue}
			findByInput={TaxTypes.findByInput}
			notFoundText="稅別 ${id} 不存在"
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
