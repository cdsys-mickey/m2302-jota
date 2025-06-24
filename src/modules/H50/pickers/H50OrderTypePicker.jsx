import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H50OrderType from "./H50OrderType.mjs";


const H50OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H50OrderType.options}
			getOptionLabel={H50OrderType.getOptionLabel}
			isOptionEqualToValue={H50OrderType.isOptionEqualToValue}
			findByInput={H50OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H50OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H50OrderTypePicker.displayName = "H50OrderTypePicker";
export default H50OrderTypePicker;







