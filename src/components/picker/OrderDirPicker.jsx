import Constants from "@/modules/md-constants";
import OrderDirs from "@/modules/OrderDirs.mjs";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const OrderDirPicker = forwardRef((props, ref) => {
	const { name, label = "順序", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={OrderDirs.options}
			getOptionLabel={OrderDirs.getOptionLabel}
			isOptionEqualToValue={OrderDirs.isOptionEqualToValue}
			findByInput={OrderDirs.findByInput}
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
