import { AuthContext } from "@/contexts/auth/AuthContext";
import Codes from "@/shared-modules/md-codes";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import { OptionPicker } from "@/shared-components";

const TransportPicker = forwardRef((props, ref) => {
	const { name, label = "貨運類別", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<OptionPicker
			name={name}
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/sales/customer/transports`}
			getOptionLabel={Codes.getOptionLabel}
			isOptionEqualToValue={Codes.isOptionEqualToValue}
			notFoundText="貨運類別 ${input} 不存在"
			{...rest} />
	);
});
TransportPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
};

TransportPicker.displayName = "TransportPicker";
export default TransportPicker;
