import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import TypoWebApiOptionsPickerContainer from "../../shared-components/typo/TypoWebApiOptionsPickerContainer";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import ProdSCats from "../../modules/md-prod-s-cats";
import { useWatch } from "react-hook-form";
import { useMemo } from "react";
import queryString from "query-string";

const ProdCatSPickerContainer = forwardRef((props, ref) => {
	const { children, ...rest } = props;
	const { token } = useContext(AuthContext);
	const catL = useWatch({ name: "catL" });
	const catM = useWatch({ name: "catM" });
	const disabled = useMemo(() => {
		return !catL?.LClas || !catM?.MClas;
	}, [catL?.LClas, catM?.MClas]);

	const url = useMemo(() => {
		return disabled ? null : `v1/prod/s-cats/${catL?.LClas},${catM?.MClas}`;
	}, [catL?.LClas, catM?.MClas, disabled]);

	return (
		<TypoWebApiOptionsPickerContainer
			label="小分類"
			ref={ref}
			bearer={token}
			disabled={disabled}
			url={url}
			getOptionLabel={ProdSCats.getOptionLabel}
			isOptionEqualToValue={ProdSCats.isOptionEqualToValue}
			{...rest}>
			{children}
		</TypoWebApiOptionsPickerContainer>
	);
});
ProdCatSPickerContainer.propTypes = {
	children: PropTypes.node,
};

ProdCatSPickerContainer.displayName = "ProdCatSPickerContainer";
export default ProdCatSPickerContainer;
