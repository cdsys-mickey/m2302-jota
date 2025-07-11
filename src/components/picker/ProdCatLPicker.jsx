import { AuthContext } from "@/contexts/auth/AuthContext";
import ProdLCats from "@/modules/md-prod-l-cats";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import { OptionPicker } from "@/shared-components";

const ProdCatLPicker = memo((props) => {
	const { name, label = "大分類", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<OptionPicker
			name={name}
			label={label}
			bearer={token}
			url={`v1/prod/l-cats`}
			getOptionLabel={ProdLCats.getOptionLabel}
			isOptionEqualToValue={ProdLCats.isOptionEqualToValue}
			notFoundText="大分類 ${input} 不存在"
			// blurToLookup
			{...rest}
		/>
	);
});

ProdCatLPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

ProdCatLPicker.displayName = "ProdCatLPicker";
export default ProdCatLPicker;
