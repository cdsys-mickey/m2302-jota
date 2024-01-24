import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import { useWatch } from "react-hook-form";
import { TypoWebApiOptionPickerContainer } from "@/shared-components/typo/TypoWebApiOptionPickerContainer";
import Banks from "@/modules/md-banks";

const TypoBankPickerContainer = forwardRef((props, ref) => {
	const { name, children, label = "銀行", ...rest } = props;
	const { token } = useContext(AuthContext);
	const value = useWatch({
		name,
	});

	return (
		<TypoWebApiOptionPickerContainer
			name={name}
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/banks`}
			getOptionLabel={Banks.getOptionLabel}
			isOptionEqualToValue={Banks.isOptionEqualToValue}
			{...rest}>
			{children || Banks.getOptionLabel(value)}
		</TypoWebApiOptionPickerContainer>
	);
});
TypoBankPickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

TypoBankPickerContainer.displayName = "TypoBankPickerContainer";
export default TypoBankPickerContainer;
