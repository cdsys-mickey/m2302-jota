import TaxTypes from "@/modules/md-tax-types";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import OptionPicker from "@/shared-components/option-picker/OptionPicker";

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
