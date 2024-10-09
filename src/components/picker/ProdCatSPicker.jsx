import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ProdSCats from "@/modules/md-prod-s-cats";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import { useChangeTracking } from "../../shared-hooks/useChangeTracking";

const ProdCatSPicker = (props) => {
	const { name, label = "小分類", readOnly = false, catL, catM, ...rest } = props;
	const { token } = useContext(AuthContext);
	const form = useFormContext();
	const { setValue } = form;
	const catLValue = useWatch({ name: "catL" });
	const catMValue = useWatch({ name: "catM" });

	const _catL = useMemo(() => {
		return catL || catLValue?.LClas;
	}, [catL, catLValue?.LClas])

	const _catM = useMemo(() => {
		return catM || catMValue?.MClas;
	}, [catM, catMValue?.MClas])

	const disabled = useMemo(() => {
		return !_catL || !_catM || readOnly;
	}, [_catL, _catM, readOnly]);

	const url = useMemo(() => {
		return disabled ? null : `v1/prod/s-cats/${_catL},${_catM}`;
	}, [_catL, _catM, disabled]);

	// 中分類清空則同步
	useChangeTracking(() => {
		if (_catM == null) {
			setValue(name, null);
		}
	}, [_catM]);

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
			resetOnChange
			{...rest}
		/>
	);
};

ProdCatSPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	catL: PropTypes.string,
	catM: PropTypes.string,
	readOnly: PropTypes.bool,
};

ProdCatSPicker.displayName = "ProdCatSPicker";
export default ProdCatSPicker;
