import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P10OrderType from "./P10OrderType.mjs";


const P10OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P10OrderType.options}
			getOptionLabel={P10OrderType.getOptionLabel}
			isOptionEqualToValue={P10OrderType.isOptionEqualToValue}
			findByInput={P10OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P10OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P10OrderTypePicker.displayName = "P10OrderTypePicker";
export default P10OrderTypePicker;




