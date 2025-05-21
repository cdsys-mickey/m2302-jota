import { memo, forwardRef } from "react";
import PropTypes from "prop-types";
import TypoOptionPickerContainer from "@/shared-components/option-picker/TypoOptionPickerContainer";
import TaxTypes from "@/modules/TaxTypes.mjs";
import { useWatch } from "react-hook-form";

export const TypoTaxTypePickerContainer = forwardRef((props, ref) => {
	const { name, children, label = "稅別", ...rest } = props;
	const value = useWatch({
		name,
	});
	return (
		<TypoOptionPickerContainer
			name={name}
			ref={ref}
			label={label}
			options={TaxTypes.options}
			getOptionLabel={TaxTypes.getOptionLabel}
			isOptionEqualToValue={TaxTypes.isOptionEqualToValue}
			{...rest}>
			{children || TaxTypes.getOptionLabel(value)}
		</TypoOptionPickerContainer>
	);
});
TypoTaxTypePickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

TypoTaxTypePickerContainer.displayName = "TypoTaxTypePickerContainer";
