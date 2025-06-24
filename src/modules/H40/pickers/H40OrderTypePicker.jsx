import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H40OrderType from "./H40OrderType.mjs";


const H40OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H40OrderType.options}
			getOptionLabel={H40OrderType.getOptionLabel}
			isOptionEqualToValue={H40OrderType.isOptionEqualToValue}
			findByInput={H40OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H40OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H40OrderTypePicker.displayName = "H40OrderTypePicker";
export default H40OrderTypePicker;







