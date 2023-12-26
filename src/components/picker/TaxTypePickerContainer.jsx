import { forwardRef } from "react";
import PropTypes from "prop-types";
import TypoOptionPickerContainer from "../../shared-components/typo/TypoOptionPickerContainer";
import TaxTypes from "@/modules/md-tax-types";
import { useWatch } from "react-hook-form";
import OptionPicker from "@/shared-components/picker/OptionPicker";

const TaxTypePickerContainer = forwardRef((props, ref) => {
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
TaxTypePickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

TaxTypePickerContainer.displayName = "TaxTypePickerContainer";
export default TaxTypePickerContainer;
