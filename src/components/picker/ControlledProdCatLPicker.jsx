import { AuthContext } from "@/contexts/auth/AuthContext";
import ProdLCats from "@/modules/md-prod-l-cats";
import { ControlledWebApiOptionPicker } from "@/shared-components/controlled/ControlledWebApiOptionPicker";
import PropTypes from "prop-types";
import { memo, useContext } from "react";

export const ControlledProdCatLPicker = memo((props) => {
	const { name, label = "大分類", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<ControlledWebApiOptionPicker
			name={name}
			label={label}
			bearer={token}
			url={`v1/prod/l-cats`}
			getOptionLabel={ProdLCats.getOptionLabel}
			isOptionEqualToValue={ProdLCats.isOptionEqualToValue}
			{...rest}
		/>
	);
});

ControlledProdCatLPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

ControlledProdCatLPicker.displayName = "ControlledProdCatLPicker";
