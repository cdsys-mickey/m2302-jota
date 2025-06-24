import { AuthContext } from "@/contexts/auth/AuthContext";
import ProdLCats from "@/modules/md-prod-l-cats";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";

export const ZZTypoProdCatLPickerContainer = forwardRef((props, ref) => {
	const { name, label = "大分類", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<OptionPicker
			name={name}
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/prod/l-cats`}
			getOptionLabel={ProdLCats.getOptionLabel}
			isOptionEqualToValue={ProdLCats.isOptionEqualToValue}
			{...rest}
		/>
	);
});
ZZTypoProdCatLPickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

ZZTypoProdCatLPickerContainer.displayName = "ZZTypoProdCatLPickerContainer";
