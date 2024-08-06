import { AuthContext } from "@/contexts/auth/AuthContext";
import { TypoWebApiOptionPickerContainer } from "@/shared-components/typo/TypoWebApiOptionPickerContainer";
import PropTypes from "prop-types";
import { forwardRef, useContext, useMemo } from "react";
import { useWatch } from "react-hook-form";
import ProdSCats from "@/modules/md-prod-s-cats";

export const ZZTypoProdCatSPickerContainer = forwardRef((props, ref) => {
	const { name, children, readOnly = false, ...rest } = props;
	const { token } = useContext(AuthContext);
	const catL = useWatch({ name: "catL" });
	const catM = useWatch({ name: "catM" });
	const disabled = useMemo(() => {
		return !catL?.LClas || !catM?.MClas || readOnly;
	}, [catL?.LClas, catM?.MClas, readOnly]);

	const url = useMemo(() => {
		return disabled ? null : `v1/prod/s-cats/${catL?.LClas},${catM?.MClas}`;
	}, [catL?.LClas, catM?.MClas, disabled]);

	const value = useWatch({
		name,
	});

	return (
		<TypoWebApiOptionPickerContainer
			name={name}
			label="小分類"
			ref={ref}
			bearer={token}
			disabled={disabled}
			url={url}
			getOptionLabel={ProdSCats.getOptionLabel}
			isOptionEqualToValue={ProdSCats.isOptionEqualToValue}
			{...rest}>
			{children || ProdSCats.getOptionLabel(value)}
		</TypoWebApiOptionPickerContainer>
	);
});
ZZTypoProdCatSPickerContainer.propTypes = {
	name: PropTypes.string,
	children: PropTypes.node,
	readOnly: PropTypes.bool,
};

ZZTypoProdCatSPickerContainer.displayName = "ZZTypoProdCatSPickerContainer";
