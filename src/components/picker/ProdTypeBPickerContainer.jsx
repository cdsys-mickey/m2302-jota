import PropTypes from "prop-types";
import { forwardRef } from "react";
import ProdTypeB from "../../modules/md-prod-type-b";
import TypoOptionPickerContainer from "../../shared-components/typo/TypoOptionPickerContainer";

const ProdTypeBPickerContainer = forwardRef((props, ref) => {
	const { children, label = "品類", ...rest } = props;
	return (
		<TypoOptionPickerContainer
			ref={ref}
			label={label}
			options={ProdTypeB.options}
			getOptionLabel={ProdTypeB.getOptionLabel}
			isOptionEqualToValue={ProdTypeB.isOptionEqualToValue}
			{...rest}>
			{children}
		</TypoOptionPickerContainer>
	);
});
ProdTypeBPickerContainer.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

ProdTypeBPickerContainer.displayName = "ProdTypeBPickerContainer";
export default ProdTypeBPickerContainer;
