import TaxTypes from "@/modules/md-tax-types";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { OptionPickerWrapper } from "../../shared-components/option-picker/OptionPickerWrapper";

const TaxTypePickerContainer = forwardRef((props, ref) => {
	const { name, label = "稅別", ...rest } = props;

	return (
		<OptionPickerWrapper
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
