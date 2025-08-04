import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P52OrderType from "./P52OrderType.mjs";


const P52OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P52OrderType.options}
			getOptionLabel={P52OrderType.getOptionLabel}
			isOptionEqualToValue={P52OrderType.isOptionEqualToValue}
			findByInput={P52OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P52OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P52OrderTypePicker.displayName = "P52OrderTypePicker";
export default P52OrderTypePicker;










