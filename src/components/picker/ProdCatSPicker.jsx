import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { useWatch } from "react-hook-form";
import ProdSCats from "@/modules/md-prod-s-cats";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";

const ProdCatSPicker = (props) => {
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
		<OptionPickerWrapper
			name={name}
			label="小分類"
			bearer={token}
			disabled={disabled}
			url={url}
			getOptionLabel={ProdSCats.getOptionLabel}
			isOptionEqualToValue={ProdSCats.isOptionEqualToValue}
			{...rest}
		/>
	);
};

ProdCatSPicker.propTypes = {
	name: PropTypes.string,
	readOnly: PropTypes.bool,
};

ProdCatSPicker.displayName = "ProdCatSPicker";
export default ProdCatSPicker;
