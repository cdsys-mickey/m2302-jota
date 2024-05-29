import PropTypes from "prop-types";
import { forwardRef } from "react";
import ProdTypeB from "../../modules/md-prod-type-b";
import TypoOptionPickerContainer from "../../shared-components/typo/TypoOptionPickerContainer";
import OptionPicker from "../../shared-components/option-picker/OptionPicker";
import { ControlledOptionPicker } from "../../shared-components/option-picker/ControlledOptionPicker";

const ProdTypeBPickerContainer = forwardRef((props, ref) => {
	const { name, label = "品類", ...rest } = props;
	return (
		<ControlledOptionPicker
			name={name}
			ref={ref}
			label={label}
			options={ProdTypeB.options}
			getOptionLabel={ProdTypeB.getOptionLabel}
			isOptionEqualToValue={ProdTypeB.isOptionEqualToValue}
			{...rest}
		/>
	);
});
ProdTypeBPickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

ProdTypeBPickerContainer.displayName = "ProdTypeBPickerContainer";
export default ProdTypeBPickerContainer;
