import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import CmsCustTypes from "./CmsCustTypes";

const CmsCustTypePicker = forwardRef((props, ref) => {
	const { label = "客源型態", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<OptionPicker
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/cms/cust-types`}
			getOptionLabel={CmsCustTypes.getOptionLabel}
			isOptionEqualToValue={CmsCustTypes.isOptionEqualToValue}
			notFoundText="客源型態 ${input} 不存在"
			// blurToLookup
			{...rest}
		/>
	);
});
CmsCustTypePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

CmsCustTypePicker.displayName = "CmsCustTypePicker";
export default CmsCustTypePicker;
