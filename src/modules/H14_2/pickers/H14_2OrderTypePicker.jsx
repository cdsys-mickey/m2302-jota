import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H14_2OrderType from "./H14_2OrderType.mjs";


const H14_2OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H14_2OrderType.options}
			getOptionLabel={H14_2OrderType.getOptionLabel}
			isOptionEqualToValue={H14_2OrderType.isOptionEqualToValue}
			findByInput={H14_2OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H14_2OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H14_2OrderTypePicker.displayName = "H141OrderTypePicker";
export default H14_2OrderTypePicker;



