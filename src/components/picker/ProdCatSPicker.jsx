import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ProdSCats from "@/modules/md-prod-s-cats";
import { OptionPicker } from "@/shared-components";
import { useChangeTracking } from "../../shared-hooks/useChangeTracking";

const ProdCatSPicker = (props) => {
	const { name, label = "小分類", readOnly = false, catL, catLName = "catL", catM, catMName = "catM", ...rest } = props;
	const { token } = useContext(AuthContext);
	const form = useFormContext();
	const { setValue } = form;
	const catLValue = useWatch({ name: catLName });
	const catMValue = useWatch({ name: catMName });

	const _catL = useMemo(() => {
		return catL || catLValue?.LClas;
	}, [catL, catLValue?.LClas])

	const _catM = useMemo(() => {
		return catM || catMValue?.MClas;
	}, [catM, catMValue?.MClas])

	const _disabled = useMemo(() => {
		return !_catL || !_catM || readOnly;
	}, [_catL, _catM, readOnly]);

	const url = useMemo(() => {
		return `v1/prod/s-cats/${_catL},${_catM}`;
	}, [_catL, _catM]);

	// 中分類清空則同步
	useChangeTracking(() => {
		if (_catM == null) {
			setValue(name, null);
		}
	}, [_catM]);

	return (
		<OptionPicker
			name={name}
			label={label}
			bearer={token}
			disabled={_disabled}
			url={url}
			getOptionLabel={ProdSCats.getOptionLabel}
			isOptionEqualToValue={ProdSCats.isOptionEqualToValue}
			notFoundText="小分類 ${input} 不存在"
			clearOnChange
			// blurToLookup
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
	catLName: PropTypes.string,
	catMName: PropTypes.string,
};

ProdCatSPicker.displayName = "ProdCatSPicker";
export default ProdCatSPicker;
