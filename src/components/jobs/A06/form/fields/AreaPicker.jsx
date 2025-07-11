import { AuthContext } from "@/contexts/auth/AuthContext";
import Codes from "@/shared-modules/md-codes";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import { OptionPicker } from "@/shared-components";

const AreaPicker = forwardRef((props, ref) => {
	const { name, label = "區域", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<OptionPicker
			name={name}
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/sales/customer/areas`}
			getOptionLabel={Codes.getOptionLabel}
			isOptionEqualToValue={Codes.isOptionEqualToValue}
			notFoundText="區域 ${input} 不存在"
			{...rest} />
	);
});
AreaPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

AreaPicker.displayName = "AreaPicker";
export default AreaPicker;
