import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H45OrderType from "./H45OrderType.mjs";


const H45OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H45OrderType.options}
			getOptionLabel={H45OrderType.getOptionLabel}
			isOptionEqualToValue={H45OrderType.isOptionEqualToValue}
			findByInput={H45OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H45OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H45OrderTypePicker.displayName = "H45OrderTypePicker";
export default H45OrderTypePicker;







