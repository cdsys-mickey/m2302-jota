import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import { OptionPicker } from "@/shared-components";
import CmsTypes from "./CmsTypes";

const CmsTypePicker = forwardRef((props, ref) => {
	const { label = "佣金類別", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<OptionPicker
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/prod/cms-types`}
			getOptionLabel={CmsTypes.getOptionLabel}
			isOptionEqualToValue={CmsTypes.isOptionEqualToValue}
			notFoundText="佣金類別 ${input} 不存在"
			// blurToLookup
			{...rest}
		/>
	);
});
CmsTypePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

CmsTypePicker.displayName = "CmsTypePicker";
export default CmsTypePicker;
