import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H16OrderType from "./H16OrderType.mjs";


const H16OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H16OrderType.options}
			getOptionLabel={H16OrderType.getOptionLabel}
			isOptionEqualToValue={H16OrderType.isOptionEqualToValue}
			findByInput={H16OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H16OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H16OrderTypePicker.displayName = "H16OrderTypePicker";
export default H16OrderTypePicker;


