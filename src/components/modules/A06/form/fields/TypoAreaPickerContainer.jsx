import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import { useWatch } from "react-hook-form";
import { TypoWebApiOptionPickerContainer } from "@/shared-components/typo/TypoWebApiOptionPickerContainer";
import Codes from "@/shared-modules/md-codes";

const TypoAreaPickerContainer = forwardRef((props, ref) => {
	const { name, children, label = "區域", ...rest } = props;
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
			url={`v1/sale/customer/areas`}
			getOptionLabel={Codes.getOptionLabel}
			isOptionEqualToValue={Codes.isOptionEqualToValue}
			{...rest}>
			{children || Codes.getOptionLabel(value)}
		</TypoWebApiOptionPickerContainer>
	);
});
TypoAreaPickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

TypoAreaPickerContainer.displayName = "TypoAreaPickerContainer";
export default TypoAreaPickerContainer;
