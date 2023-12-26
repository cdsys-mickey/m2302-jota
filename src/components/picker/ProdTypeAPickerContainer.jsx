import PropTypes from "prop-types";
import { forwardRef } from "react";
import ProdTypeA from "../../modules/md-prod-type-a";
import TypoOptionPickerContainer from "../../shared-components/typo/TypoOptionPickerContainer";
import { ControlledOptionPicker } from "../../shared-components/controlled/ControlledOptionPicker";

const ProdTypeAPickerContainer = forwardRef((props, ref) => {
	const { name, readOnly = false, label = "品別", ...rest } = props;

	return (
		<ControlledOptionPicker
			name={name}
			readOnly={readOnly}
			ref={ref}
			label={label}
			options={ProdTypeA.options}
			getOptionLabel={ProdTypeA.getOptionLabel}
			isOptionEqualToValue={ProdTypeA.isOptionEqualToValue}
			{...rest}
		/>
	);
});
ProdTypeAPickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
	readOnly: PropTypes.bool,
};

ProdTypeAPickerContainer.displayName = "ProdTypeAPickerContainer";
export default ProdTypeAPickerContainer;
