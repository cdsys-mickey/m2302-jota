import PropTypes from "prop-types";
import { forwardRef } from "react";
import ProdTypeB from "../../modules/md-prod-type-b";
import TypoOptionPickerContainer from "../../shared-components/typo/TypoOptionPickerContainer";
import OptionPicker from "../../shared-components/picker/OptionPicker";
import { ControlledOptionPicker } from "../../shared-components/controlled/ControlledOptionPicker";
import { useWatch } from "react-hook-form";

const TypoProdTypeBPickerContainer = forwardRef((props, ref) => {
	const { name, children, label = "品類", ...rest } = props;
	const value = useWatch({
		name,
	});

	return (
		<TypoOptionPickerContainer
			name={name}
			ref={ref}
			label={label}
			options={ProdTypeB.options}
			getOptionLabel={ProdTypeB.getOptionLabel}
			isOptionEqualToValue={ProdTypeB.isOptionEqualToValue}
			{...rest}>
			{children || ProdTypeB.getOptionLabel(value)}
		</TypoOptionPickerContainer>
	);
});
TypoProdTypeBPickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

TypoProdTypeBPickerContainer.displayName = "TypoProdTypeBPickerContainer";
export default TypoProdTypeBPickerContainer;