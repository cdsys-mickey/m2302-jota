import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import { OptionPicker } from "@/shared-components";
import Banks from "./Banks.mjs";

const BankPicker = forwardRef((props, ref) => {
	const { label = "銀行", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<OptionPicker
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/banks`}
			getOptionLabel={Banks.getOptionLabel}
			isOptionEqualToValue={Banks.isOptionEqualToValue}
			notFoundText="銀行 ${input} 不存在"
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
