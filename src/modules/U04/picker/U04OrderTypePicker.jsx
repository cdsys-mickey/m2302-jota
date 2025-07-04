import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import U04OrderType from "./U04OrderType.mjs";


const U04OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={U04OrderType.options}
			getOptionLabel={U04OrderType.getOptionLabel}
			isOptionEqualToValue={U04OrderType.isOptionEqualToValue}
			findByInput={U04OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
U04OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

U04OrderTypePicker.displayName = "U04OrderTypePicker";
export default U04OrderTypePicker;
