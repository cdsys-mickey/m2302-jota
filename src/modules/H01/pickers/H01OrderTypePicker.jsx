import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H01OrderType from "./H01OrderType.mjs";


const H01OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H01OrderType.options}
			getOptionLabel={H01OrderType.getOptionLabel}
			isOptionEqualToValue={H01OrderType.isOptionEqualToValue}
			findByInput={H01OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H01OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H01OrderTypePicker.displayName = "H01OrderTypePicker";
export default H01OrderTypePicker;

