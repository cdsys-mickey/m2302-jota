import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import TypoWebApiOptionsPickerContainer from "../../shared-components/typo/TypoWebApiOptionsPickerContainer";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import ProdMCats from "../../modules/md-prod-m-cats";
import { useWatch } from "react-hook-form";
import { useMemo } from "react";

const ProdCatMPickerContainer = forwardRef((props, ref) => {
	const { children, ...rest } = props;
	const { token } = useContext(AuthContext);
	const catL = useWatch({ name: "catL" });
	const disabled = useMemo(() => {
		return !catL?.LClas;
	}, [catL?.LClas]);

	const url = useMemo(() => {
		return disabled ? null : `v1/prod/m-cats/${catL?.LClas}`;
	}, [catL?.LClas, disabled]);

	return (
		<TypoWebApiOptionsPickerContainer
			label="中分類"
			ref={ref}
			bearer={token}
			disabled={disabled}
			url={url}
			getOptionLabel={ProdMCats.getOptionLabel}
			isOptionEqualToValue={ProdMCats.isOptionEqualToValue}
			{...rest}>
			{children}
		</TypoWebApiOptionsPickerContainer>
	);
});
ProdCatMPickerContainer.propTypes = {
	children: PropTypes.node,
};

ProdCatMPickerContainer.displayName = "ProdCatMPickerContainer";
export default ProdCatMPickerContainer;
