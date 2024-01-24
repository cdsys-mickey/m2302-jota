import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { forwardRef, useContext, useMemo } from "react";
import ProdSCats from "../../modules/md-prod-s-cats";
import WebApiOptionPicker from "../../shared-components/picker/WebApiOptionPicker";

export const ProdCatSPickerContainer = forwardRef((props, ref) => {
	const { catL, catM, ...rest } = props;
	const { token } = useContext(AuthContext);

	const disabled = useMemo(() => {
		return !catL || !catM;
	}, [catL, catM]);

	const url = useMemo(() => {
		return `v1/prod/s-cats/${catL},${catM}`;
	}, [catL, catM]);

	return (
		<WebApiOptionPicker
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
	catL: PropTypes.string,
	catM: PropTypes.string,
	readOnly: PropTypes.bool,
};

ProdCatSPickerContainer.displayName = "ProdCatSPickerContainer";
export default ProdCatSPickerContainer;
