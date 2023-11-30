import PropTypes from "prop-types";
import { forwardRef } from "react";
import ProdTypeB from "../../modules/md-prod-type-b";
import TypoOptionsPickerContainer from "../../shared-components/typo/TypoOptionsPickerContainer";

const ProdTypeBPickerContainer = forwardRef((props, ref) => {
	const { children, label = "品類", ...rest } = props;
	return (
		<TypoOptionsPickerContainer
			ref={ref}
			label={label}
			options={ProdTypeB.options}
			getOptionLabel={ProdTypeB.getOptionLabel}
			isOptionEqualToValue={ProdTypeB.isOptionEqualToValue}
			{...rest}>
			{children}
		</TypoOptionsPickerContainer>
	);
});
ProdTypeBPickerContainer.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

ProdTypeBPickerContainer.displayName = "ProdTypeBPickerContainer";
export default ProdTypeBPickerContainer;
