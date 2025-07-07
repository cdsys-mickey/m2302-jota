import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H14_1OrderType from "./H14_1OrderType.mjs";


const H14_1OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H14_1OrderType.options}
			getOptionLabel={H14_1OrderType.getOptionLabel}
			isOptionEqualToValue={H14_1OrderType.isOptionEqualToValue}
			findByInput={H14_1OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H14_1OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H14_1OrderTypePicker.displayName = "H141OrderTypePicker";
export default H14_1OrderTypePicker;


