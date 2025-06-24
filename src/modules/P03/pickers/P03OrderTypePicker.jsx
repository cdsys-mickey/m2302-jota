import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P03OrderType from "./P03OrderType.mjs";


const P03OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P03OrderType.options}
			getOptionLabel={P03OrderType.getOptionLabel}
			isOptionEqualToValue={P03OrderType.isOptionEqualToValue}
			findByInput={P03OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P03OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P03OrderTypePicker.displayName = "P03OrderTypePicker";
export default P03OrderTypePicker;



