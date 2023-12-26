import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { TypoWebApiOptionPickerContainer } from "@/shared-components/typo/TypoWebApiOptionPickerContainer";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import ProdMCats from "@/modules/md-prod-m-cats";
import { useWatch } from "react-hook-form";
import { useMemo } from "react";

const TypoProdCatMPickerContainer = forwardRef((props, ref) => {
	const { name, children, readOnly = false, ...rest } = props;
	const { token } = useContext(AuthContext);
	const catL = useWatch({ name: "catL" });
	const disabled = useMemo(() => {
		return !catL?.LClas || readOnly;
	}, [catL?.LClas, readOnly]);

	const url = useMemo(() => {
		return disabled ? null : `v1/prod/m-cats/${catL?.LClas}`;
	}, [catL?.LClas, disabled]);

	const value = useWatch({
		name,
	});

	return (
		<TypoWebApiOptionPickerContainer
			name={name}
			label="中分類"
			ref={ref}
			bearer={token}
			disabled={disabled}
			url={url}
			getOptionLabel={ProdMCats.getOptionLabel}
			isOptionEqualToValue={ProdMCats.isOptionEqualToValue}
			{...rest}>
			{children || ProdMCats.getOptionLabel(value)}
		</TypoWebApiOptionPickerContainer>
	);
});
TypoProdCatMPickerContainer.propTypes = {
	name: PropTypes.string,
	children: PropTypes.node,
	readOnly: PropTypes.bool,
};

TypoProdCatMPickerContainer.displayName = "TypoProdCatMPickerContainer";
export default TypoProdCatMPickerContainer;
