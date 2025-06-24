import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H10OrderType from "./H10OrderType.mjs";


const H10OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H10OrderType.options}
			getOptionLabel={H10OrderType.getOptionLabel}
			isOptionEqualToValue={H10OrderType.isOptionEqualToValue}
			findByInput={H10OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H10OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H10OrderTypePicker.displayName = "H10OrderTypePicker";
export default H10OrderTypePicker;

