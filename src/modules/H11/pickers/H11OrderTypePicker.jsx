import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H11OrderType from "./H11OrderType.mjs";


const H11OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H11OrderType.options}
			getOptionLabel={H11OrderType.getOptionLabel}
			isOptionEqualToValue={H11OrderType.isOptionEqualToValue}
			findByInput={H11OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H11OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H11OrderTypePicker.displayName = "H11OrderTypePicker";
export default H11OrderTypePicker;


