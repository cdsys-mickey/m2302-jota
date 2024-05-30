import { AuthContext } from "@/contexts/auth/AuthContext";
import Codes from "@/shared-modules/sd-codes";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import { OptionPickerWrapper } from "../../shared-components/option-picker/OptionPickerWrapper";

const TransportTypePicker = forwardRef((props, ref) => {
	const { label = "貨運類別", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<OptionPickerWrapper
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/sale/customer/transports`}
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
