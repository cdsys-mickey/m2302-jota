import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import TypoWebApiOptionsPickerContainer from "../../shared-components/typo/TypoWebApiOptionsPickerContainer";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import ProdLCats from "../../modules/md-prod-l-cats";

const ProdCatLPickerContainer = forwardRef((props, ref) => {
	const { children, label = "大分類", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<TypoWebApiOptionsPickerContainer
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/prod/l-cats`}
			getOptionLabel={ProdLCats.getOptionLabel}
			isOptionEqualToValue={ProdLCats.isOptionEqualToValue}
			{...rest}>
			{children}
		</TypoWebApiOptionsPickerContainer>
	);
});
ProdCatLPickerContainer.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

ProdCatLPickerContainer.displayName = "ProdCatLPickerContainer";
export default ProdCatLPickerContainer;
