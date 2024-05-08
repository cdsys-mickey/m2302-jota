import { AuthContext } from "@/contexts/auth/AuthContext";
import ProdMCats from "@/modules/md-prod-m-cats";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { useWatch } from "react-hook-form";

import { OptionPickerWrapper } from "../../shared-components/picker/OptionPickerWrapper";

const ProdCatMPicker = (props) => {
	const { name, readOnly = false, ...rest } = props;
	const { token } = useContext(AuthContext);
	const catL = useWatch({ name: "catL" });
	const disabled = useMemo(() => {
		return !catL?.LClas || readOnly;
	}, [catL?.LClas, readOnly]);

	const url = useMemo(() => {
		return disabled ? null : `v1/prod/m-cats/${catL?.LClas}`;
	}, [catL?.LClas, disabled]);

	return (
		<OptionPickerWrapper
			name={name}
			label="中分類"
			bearer={token}
			disabled={disabled}
			url={url}
			getOptionLabel={ProdMCats.getOptionLabel}
			isOptionEqualToValue={ProdMCats.isOptionEqualToValue}
			{...rest}
		/>
	);
};

ProdCatMPicker.propTypes = {
	name: PropTypes.string,
	readOnly: PropTypes.bool,
};

ProdCatMPicker.displayName = "ProdCatMPicker";
export default ProdCatMPicker;
