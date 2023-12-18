import PropTypes from "prop-types";
import { forwardRef } from "react";
import ProdTypeA from "../../modules/md-prod-type-a";
import TypoOptionPickerContainer from "../../shared-components/typo/TypoOptionPickerContainer";

const ProdTypeAPickerContainer = forwardRef((props, ref) => {
	const { children, readOnly = false, label = "品別", ...rest } = props;
	return (
		<TypoOptionPickerContainer
			readOnly={readOnly}
			ref={ref}
			label={label}
			options={ProdTypeA.options}
			getOptionLabel={ProdTypeA.getOptionLabel}
			isOptionEqualToValue={ProdTypeA.isOptionEqualToValue}
			{...rest}>
			{children}
		</TypoOptionPickerContainer>
	);
});
ProdTypeAPickerContainer.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	readOnly: PropTypes.bool,
};

ProdTypeAPickerContainer.displayName = "ProdTypeAPickerContainer";
export default ProdTypeAPickerContainer;
