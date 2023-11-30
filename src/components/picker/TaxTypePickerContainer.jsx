import { memo, forwardRef } from "react";
import PropTypes from "prop-types";
import TypoOptionPickerContainer from "../../shared-components/typo/TypoOptionPickerContainer";
import TaxTypes from "../../modules/md-tax-types";

const TaxTypePickerContainer = forwardRef((props, ref) => {
	const { children, label = "稅別", ...rest } = props;
	return (
		<TypoOptionPickerContainer
			ref={ref}
			label={label}
			options={TaxTypes.options}
			getOptionLabel={TaxTypes.getOptionLabel}
			isOptionEqualToValue={TaxTypes.isOptionEqualToValue}
			{...rest}>
			{children}
		</TypoOptionPickerContainer>
	);
});
TaxTypePickerContainer.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

TaxTypePickerContainer.displayName = "TaxTypePickerContainer";
export default TaxTypePickerContainer;
