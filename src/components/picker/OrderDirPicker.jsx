import Constants from "@/modules/md-constants";
import OrderDir from "@/modules/OrderDir.mjs";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const OrderDirPicker = forwardRef((props, ref) => {
	const { name, label = "順序", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={OrderDir.options}
			getOptionLabel={OrderDir.getOptionLabel}
			isOptionEqualToValue={OrderDir.isOptionEqualToValue}
			findByInput={OrderDir.findByInput}
			notFoundText="順序 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
OrderDirPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

OrderDirPicker.displayName = "OrderDirPicker";
export default OrderDirPicker;
