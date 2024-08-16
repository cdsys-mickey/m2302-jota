import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ProdSCats from "@/modules/md-prod-s-cats";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import { useChangeTracking } from "../../shared-hooks/useChangeTracking";

const ProdCatSPicker = (props) => {
	const { name, label = "小分類", readOnly = false, ...rest } = props;
	const { token } = useContext(AuthContext);
	const form = useFormContext();
	const { setValue } = form;
	const catL = useWatch({ name: "catL" });
	const catM = useWatch({ name: "catM" });
	const disabled = useMemo(() => {
		return !catL?.LClas || !catM?.MClas || readOnly;
	}, [catL?.LClas, catM?.MClas, readOnly]);

	const url = useMemo(() => {
		return disabled ? null : `v1/prod/s-cats/${catL?.LClas},${catM?.MClas}`;
	}, [catL?.LClas, catM?.MClas, disabled]);

	useChangeTracking(() => {
		if (!catM) {
			setValue(name, null);
		}
	}, [catM]);

	return (
		<OptionPickerWrapper
			name={name}
			label={label}
			bearer={token}
			disabled={disabled}
			url={url}
			getOptionLabel={ProdSCats.getOptionLabel}
			isOptionEqualToValue={ProdSCats.isOptionEqualToValue}
			notFoundText="小分類 ${id} 不存在"
			{...rest}
		/>
	);
};

ProdCatSPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	readOnly: PropTypes.bool,
};

ProdCatSPicker.displayName = "ProdCatSPicker";
export default ProdCatSPicker;
