import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H39OrderType from "./H39OrderType.mjs";


const H39OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H39OrderType.options}
			getOptionLabel={H39OrderType.getOptionLabel}
			isOptionEqualToValue={H39OrderType.isOptionEqualToValue}
			findByInput={H39OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H39OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H39OrderTypePicker.displayName = "H39OrderTypePicker";
export default H39OrderTypePicker;








