import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { useWatch } from "react-hook-form";
import ProdSCats from "../../modules/md-prod-s-cats";
import { ControlledWebApiOptionPicker } from "../../shared-components/controlled/ControlledWebApiOptionPicker";

const ControlledProdCatSPicker = (props) => {
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
			bearer={token}
			disabled={disabled}
			url={url}
			getOptionLabel={ProdSCats.getOptionLabel}
			isOptionEqualToValue={ProdSCats.isOptionEqualToValue}
			{...rest}
		/>
	);
};

ControlledProdCatSPicker.propTypes = {
	name: PropTypes.string,
	readOnly: PropTypes.bool,
};

ControlledProdCatSPicker.displayName = "ControlledProdCatSPicker";
export default ControlledProdCatSPicker;
