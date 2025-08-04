import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P58OrderType from "./P58OrderType.mjs";


const P58OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P58OrderType.options}
			getOptionLabel={P58OrderType.getOptionLabel}
			isOptionEqualToValue={P58OrderType.isOptionEqualToValue}
			findByInput={P58OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P58OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P58OrderTypePicker.displayName = "P58OrderTypePicker";
export default P58OrderTypePicker;











