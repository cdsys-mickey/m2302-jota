import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P10OrderTypes from "./P10OrderTypes.mjs";


const P10OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P10OrderTypes.options}
			getOptionLabel={P10OrderTypes.getOptionLabel}
			isOptionEqualToValue={P10OrderTypes.isOptionEqualToValue}
			findByInput={P10OrderTypes.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P10OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P10OrderTypePicker.displayName = "P10OrderTypePicker";
export default P10OrderTypePicker;




