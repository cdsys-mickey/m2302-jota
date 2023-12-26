import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { TypoWebApiOptionPickerContainer } from "@/shared-components/typo/TypoWebApiOptionPickerContainer";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import ProdLCats from "../../modules/md-prod-l-cats";
import { useFormContext, useWatch } from "react-hook-form";
import WebApiOptionPicker from "../../shared-components/picker/WebApiOptionPicker";
import { ControlledWebApiOptionPicker } from "../../shared-components/controlled/ControlledWebApiOptionPicker";

const ProdCatLPickerContainer = forwardRef((props, ref) => {
	const { name, label = "大分類", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<ControlledWebApiOptionPicker
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
ProdCatLPickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

ProdCatLPickerContainer.displayName = "ProdCatLPickerContainer";
export default ProdCatLPickerContainer;
