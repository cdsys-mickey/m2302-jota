import PropTypes from "prop-types";
import { forwardRef } from "react";
import { useWatch } from "react-hook-form";
import ProdTypeB from "@/modules/md-prod-type-b";
import TypoOptionPickerContainer from "@/shared-components/picker/TypoOptionPickerContainer";

export const TypoProdTypeBPickerContainer = forwardRef((props, ref) => {
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
