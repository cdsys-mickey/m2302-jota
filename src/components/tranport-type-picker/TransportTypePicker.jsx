import { AuthContext } from "@/contexts/auth/AuthContext";
import Codes from "@/shared-modules/md-codes";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import { OptionPicker } from "@/shared-components";

const TransportTypePicker = forwardRef((props, ref) => {
	const { label = "貨運類別", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<OptionPicker
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/sales/customer/transports`}
			getOptionLabel={Codes.getOptionLabel}
			isOptionEqualToValue={Codes.isOptionEqualToValue}
			getOptionKey={Codes.getOptionKey}
			{...rest}
		/>
	);
});
TransportTypePicker.propTypes = {
	label: PropTypes.string,
};

TransportTypePicker.displayName = "TransportTypePicker";
export default TransportTypePicker;
