import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H05OrderType from "./H05OrderType.mjs";


const H05OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H05OrderType.options}
			getOptionLabel={H05OrderType.getOptionLabel}
			isOptionEqualToValue={H05OrderType.isOptionEqualToValue}
			findByInput={H05OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H05OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H05OrderTypePicker.displayName = "H05OrderTypePicker";
export default H05OrderTypePicker;


