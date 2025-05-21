import { AuthContext } from "@/contexts/auth/AuthContext";
import Codes from "@/shared-modules/md-codes";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";

const ChannelPicker = forwardRef((props, ref) => {
	const { name, label = "通路", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<OptionPickerWrapper
			name={name}
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/sales/customer/channels`}
			getOptionLabel={Codes.getOptionLabel}
			isOptionEqualToValue={Codes.isOptionEqualToValue}
			notFoundText="通路 ${input} 不存在"
			{...rest} />
	);
});
ChannelPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

ChannelPicker.displayName = "ChannelPicker";
export default ChannelPicker;
