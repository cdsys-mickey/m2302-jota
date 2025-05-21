import { AuthContext } from "@/contexts/auth/AuthContext";
import ProdMCats from "@/modules/md-prod-m-cats";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

const ProdCatMPicker = (props) => {
	const { name, label = "中分類", catLName = "catL", catL, readOnly = false, ...rest } = props;
	const { token } = useContext(AuthContext);
	const form = useFormContext();
	const { setValue } = form;

	const catLValue = useWatch({ name: catLName });

	const _catL = useMemo(() => {
		return catL || catLValue?.LClas;
	}, [catL, catLValue?.LClas])


	const _disabled = useMemo(() => {
		return !_catL || readOnly;
	}, [_catL, readOnly]);

	const url = useMemo(() => {
		return `v1/prod/m-cats/${_catL}`;
	}, [_catL]);

	// 大分類清空則同步
	useChangeTracking(() => {
		if (_catL == null) {
			setValue(name, null);
		}
	}, [catL]);

	return (
		<OptionPickerWrapper
			name={name}
			label={label}
			bearer={token}
			disabled={_disabled}
			url={url}
			getOptionLabel={ProdMCats.getOptionLabel}
			isOptionEqualToValue={ProdMCats.isOptionEqualToValue}
			notFoundText="中分類 ${input} 不存在"
			clearOnChange
			readOnly={readOnly}
			// blurToLookup
			{...rest}
		/>
	);
};

ProdCatMPicker.propTypes = {
	catLName: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	catL: PropTypes.string,
	readOnly: PropTypes.bool,
};

ProdCatMPicker.displayName = "ProdCatMPicker";
export default ProdCatMPicker;
