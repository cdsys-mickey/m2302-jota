import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { TypoWebApiOptionPickerContainer } from "@/shared-components/typo/TypoWebApiOptionPickerContainer";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import ProdSCats from "../../modules/md-prod-s-cats";
import { useWatch } from "react-hook-form";
import { useMemo } from "react";
import queryString from "query-string";
import WebApiOptionPicker from "../../shared-components/picker/WebApiOptionPicker";
import { ControlledWebApiOptionPicker } from "../../shared-components/controlled/ControlledWebApiOptionPicker";

const ProdCatSPickerContainer = forwardRef((props, ref) => {
	const { name, readOnly = false, ...rest } = props;
	const { token } = useContext(AuthContext);
	const catL = useWatch({ name: "catL" });
	const catM = useWatch({ name: "catM" });
	const disabled = useMemo(() => {
		return !catL?.LClas || !catM?.MClas || readOnly;
	}, [catL?.LClas, catM?.MClas, readOnly]);

	const url = useMemo(() => {
		return disabled ? null : `v1/prod/s-cats/${catL?.LClas},${catM?.MClas}`;
	}, [catL?.LClas, catM?.MClas, disabled]);

	return (
		<ControlledWebApiOptionPicker
			name={name}
			label="小分類"
			ref={ref}
			bearer={token}
			disabled={disabled}
			url={url}
			getOptionLabel={ProdSCats.getOptionLabel}
			isOptionEqualToValue={ProdSCats.isOptionEqualToValue}
			{...rest}
		/>
	);
});
ProdCatSPickerContainer.propTypes = {
	name: PropTypes.string,
	readOnly: PropTypes.bool,
};

ProdCatSPickerContainer.displayName = "ProdCatSPickerContainer";
export default ProdCatSPickerContainer;
