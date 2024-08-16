import { AuthContext } from "@/contexts/auth/AuthContext";
import Banks from "@/modules/md-banks";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import { OptionPickerWrapper } from "../../shared-components/option-picker/OptionPickerWrapper";

const BankPicker = forwardRef((props, ref) => {
	const { name, label = "銀行", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<OptionPickerWrapper
			name={name}
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/banks`}
			getOptionLabel={Banks.getOptionLabel}
			isOptionEqualToValue={Banks.isOptionEqualToValue}
			notFoundText="銀行 ${id} 不存在"
			{...rest}
		/>
	);
});
BankPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

BankPicker.displayName = "BankPicker";
export default BankPicker;
