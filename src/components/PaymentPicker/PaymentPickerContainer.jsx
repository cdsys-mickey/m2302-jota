import { AuthContext } from "@/contexts/auth/AuthContext";
import Codes from "@/shared-modules/md-codes";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper"

const PaymentPickerContainer = forwardRef((props, ref) => {
	const { name, label = "收款方式", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<OptionPickerWrapper
			name={name}
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/sales/customer/payments`}
			getOptionLabel={Codes.getOptionLabel}
			isOptionEqualToValue={Codes.isOptionEqualToValue}
			{...rest} />
	);
});
PaymentPickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

PaymentPickerContainer.displayName = "PaymentPickerContainer";
export default PaymentPickerContainer;
