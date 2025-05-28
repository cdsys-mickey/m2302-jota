import PropTypes from "prop-types";
import { forwardRef } from "react";
import { useWatch } from "react-hook-form";
import ProdTypeB from "@/modules/ProdTypeB";
import TypoOptionPickerContainer from "@/shared-components/option-picker/TypoOptionPickerContainer";

export const ZZTypoProdTypeBPickerContainer = forwardRef((props, ref) => {
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
ZZTypoProdTypeBPickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

ZZTypoProdTypeBPickerContainer.displayName = "ZZTypoProdTypeBPickerContainer";
