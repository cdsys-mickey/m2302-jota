import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { TypoWebApiOptionPickerContainer } from "@/shared-components/typo/TypoWebApiOptionPickerContainer";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import ProdLCats from "../../modules/md-prod-l-cats";
import { useFormContext, useWatch } from "react-hook-form";

const TypoProdCatLPickerContainer = forwardRef((props, ref) => {
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
export default TypoProdCatLPickerContainer;
