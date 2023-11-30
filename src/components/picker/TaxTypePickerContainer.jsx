import { memo, forwardRef } from "react";
import PropTypes from "prop-types";
import TypoOptionsPickerContainer from "../../shared-components/typo/TypoOptionsPickerContainer";
import TaxTypes from "../../modules/md-tax-types";

const TaxTypePickerContainer = forwardRef((props, ref) => {
	const { children, label = "稅別", ...rest } = props;
	return (
		<TypoOptionsPickerContainer
			ref={ref}
			label={label}
			options={TaxTypes.options}
			getOptionLabel={TaxTypes.getOptionLabel}
			isOptionEqualToValue={TaxTypes.isOptionEqualToValue}
			{...rest}>
			{children}
		</TypoOptionsPickerContainer>
	);
});
TaxTypePickerContainer.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

TaxTypePickerContainer.displayName = "TaxTypePickerContainer";
export default TaxTypePickerContainer;
