import PropTypes from "prop-types";
import { forwardRef } from "react";
import TypoOptionPickerContainer from "@/shared-components/typo/TypoOptionPickerContainer";
import { useWatch } from "react-hook-form";
import CustomerLevels from "@/modules/md-customer-levels";

export const TypoCustomerLevelPickerContainer = forwardRef((props, ref) => {
	const { name, children, readOnly = false, label = "等級", ...rest } = props;
	const value = useWatch({
		name,
	});

	return (
		<TypoOptionPickerContainer
			name={name}
			readOnly={readOnly}
			ref={ref}
			label={label}
			options={CustomerLevels.options}
			getOptionLabel={CustomerLevels.getOptionLabel}
			isOptionEqualToValue={CustomerLevels.isOptionEqualToValue}
			{...rest}>
			{children || CustomerLevels.getOptionLabel(value)}
		</TypoOptionPickerContainer>
	);
});
TypoCustomerLevelPickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
	readOnly: PropTypes.bool,
};

TypoCustomerLevelPickerContainer.displayName =
	"TypoCustomerLevelPickerContainer";
