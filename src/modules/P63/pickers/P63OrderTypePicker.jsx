import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P63OrderType from "./P63OrderType.mjs";


const P63OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P63OrderType.options}
			getOptionLabel={P63OrderType.getOptionLabel}
			isOptionEqualToValue={P63OrderType.isOptionEqualToValue}
			findByInput={P63OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P63OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P63OrderTypePicker.displayName = "P63OrderTypePicker";
export default P63OrderTypePicker;












