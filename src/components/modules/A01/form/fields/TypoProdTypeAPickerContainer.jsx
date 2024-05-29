import PropTypes from "prop-types";
import { forwardRef } from "react";
import ProdTypeA from "@/modules/md-prod-type-a";
import TypoOptionPickerContainer from "@/shared-components/option-picker/TypoOptionPickerContainer";
import { useWatch } from "react-hook-form";

export const TypoProdTypeAPickerContainer = forwardRef((props, ref) => {
	const { name, children, readOnly = false, label = "品別", ...rest } = props;
	const value = useWatch({
		name,
	});

	return (
		<TypoOptionPickerContainer
			name={name}
			readOnly={readOnly}
			ref={ref}
			label={label}
			options={ProdTypeA.options}
			getOptionLabel={ProdTypeA.getOptionLabel}
			isOptionEqualToValue={ProdTypeA.isOptionEqualToValue}
			{...rest}>
			{children || ProdTypeA.getOptionLabel(value)}
		</TypoOptionPickerContainer>
	);
});
TypoProdTypeAPickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
	readOnly: PropTypes.bool,
};

TypoProdTypeAPickerContainer.displayName = "TypoProdTypeAPickerContainer";
