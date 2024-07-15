import { AuthContext } from "@/contexts/auth/AuthContext";
import { TypoWebApiOptionPickerContainer } from "@/shared-components/typo/TypoWebApiOptionPickerContainer";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import { useWatch } from "react-hook-form";
import ProdLCats from "@/modules/md-prod-l-cats";

export const TypoProdCatLPickerContainer = forwardRef((props, ref) => {
	const { name, children, label = "大分類", ...rest } = props;
	const { token } = useContext(AuthContext);

	const value = useWatch({
		name,
	});

	return (
		<TypoWebApiOptionPickerContainer
			name={name}
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/prod/l-cats`}
			getOptionLabel={ProdLCats.getOptionLabel}
			isOptionEqualToValue={ProdLCats.isOptionEqualToValue}
			{...rest}>
			{children || ProdLCats.getOptionLabel(value)}
		</TypoWebApiOptionPickerContainer>
	);
});
TypoProdCatLPickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

TypoProdCatLPickerContainer.displayName = "TypoProdCatLPickerContainer";
