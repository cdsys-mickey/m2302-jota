import { AuthContext } from "@/contexts/auth/AuthContext";
import { TypoWebApiOptionPickerContainer } from "@/shared-components/typo/TypoWebApiOptionPickerContainer";
import Codes from "@/shared-modules/md-codes";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import { useWatch } from "react-hook-form";

const TypoTransportPickerContainer = forwardRef((props, ref) => {
	const { name, children, label = "貨運類別", ...rest } = props;
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
			url={`v1/sale/customer/transports`}
			getOptionLabel={Codes.getOptionLabel}
			isOptionEqualToValue={Codes.isOptionEqualToValue}
			{...rest}>
			{children || Codes.getOptionLabel(value)}
		</TypoWebApiOptionPickerContainer>
	);
});
TypoTransportPickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

TypoTransportPickerContainer.displayName = "TypoTransportPickerContainer";
export default TypoTransportPickerContainer;
