import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H04OrderType from "./H04OrderType.mjs";


const H04OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H04OrderType.options}
			getOptionLabel={H04OrderType.getOptionLabel}
			isOptionEqualToValue={H04OrderType.isOptionEqualToValue}
			findByInput={H04OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H04OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H04OrderTypePicker.displayName = "H04OrderTypePicker";
export default H04OrderTypePicker;
