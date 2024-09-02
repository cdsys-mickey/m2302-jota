import { AuthContext } from "@/contexts/auth/AuthContext";
import ProdLCats from "@/modules/md-prod-l-cats";
import PropTypes from "prop-types";
import { useContext } from "react";
import WebApiOptionPicker from "../../shared-components/option-picker/WebApiOptionPicker";

export const ZZProdCatLPickerContainer = (props) => {
	const { label = "大分類", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<WebApiOptionPicker
			label={label}
			bearer={token}
			url={`v1/prod/l-cats`}
			getOptionLabel={ProdLCats.getOptionLabel}
			isOptionEqualToValue={ProdLCats.isOptionEqualToValue}
			{...rest}
		/>
	);
};

ZZProdCatLPickerContainer.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

ZZProdCatLPickerContainer.displayName = "ProdCatLPickerContainer";
