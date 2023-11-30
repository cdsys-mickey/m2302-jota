import PropTypes from "prop-types";
import { forwardRef } from "react";
import ProdTypeA from "../../modules/md-prod-type-a";
import TypoOptionsPickerContainer from "../../shared-components/typo/TypoOptionsPickerContainer";

const ProdTypeAPickerContainer = forwardRef((props, ref) => {
	const { children, label = "品別", ...rest } = props;
	return (
		<TypoOptionsPickerContainer
			ref={ref}
			label={label}
			options={ProdTypeA.options}
			getOptionLabel={ProdTypeA.getOptionLabel}
			isOptionEqualToValue={ProdTypeA.isOptionEqualToValue}
			{...rest}>
			{children}
		</TypoOptionsPickerContainer>
	);
});
ProdTypeAPickerContainer.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

ProdTypeAPickerContainer.displayName = "ProdTypeAPickerContainer";
export default ProdTypeAPickerContainer;
