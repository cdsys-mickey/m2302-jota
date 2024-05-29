import { AuthContext } from "@/contexts/auth/AuthContext";
import ProdMCats from "@/modules/md-prod-m-cats";
import PropTypes from "prop-types";
import { forwardRef, useContext, useMemo } from "react";
import WebApiOptionPicker from "../../shared-components/option-picker/WebApiOptionPicker";

export const ProdCatMPickerContainer = forwardRef((props, ref) => {
	const { catL, ...rest } = props;
	const { token } = useContext(AuthContext);

	const disabled = useMemo(() => {
		// return !catL || readOnly;
		return !catL;
	}, [catL]);

	const url = useMemo(() => {
		return `v1/prod/m-cats/${catL}`;
	}, [catL]);

	return (
		<WebApiOptionPicker
			label="中分類"
			ref={ref}
			bearer={token}
			disabled={disabled}
			url={url}
			getOptionLabel={ProdMCats.getOptionLabel}
			isOptionEqualToValue={ProdMCats.isOptionEqualToValue}
			{...rest}
		/>
	);
});

ProdCatMPickerContainer.propTypes = {
	catL: PropTypes.string,
	readOnly: PropTypes.bool,
};

ProdCatMPickerContainer.displayName = "ProdCatMPickerContainer";
export default ProdCatMPickerContainer;
