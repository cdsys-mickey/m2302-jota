import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H22OrderType from "./H22OrderType.mjs";


const H22OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H22OrderType.options}
			getOptionLabel={H22OrderType.getOptionLabel}
			isOptionEqualToValue={H22OrderType.isOptionEqualToValue}
			findByInput={H22OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H22OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H22OrderTypePicker.displayName = "H22OrderTypePicker";
export default H22OrderTypePicker;


