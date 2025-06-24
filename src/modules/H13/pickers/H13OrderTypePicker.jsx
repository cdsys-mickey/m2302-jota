import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H13OrderType from "./H13OrderType.mjs";


const H13OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H13OrderType.options}
			getOptionLabel={H13OrderType.getOptionLabel}
			isOptionEqualToValue={H13OrderType.isOptionEqualToValue}
			findByInput={H13OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H13OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H13OrderTypePicker.displayName = "H13OrderTypePicker";
export default H13OrderTypePicker;


