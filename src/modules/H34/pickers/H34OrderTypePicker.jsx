import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H34OrderType from "./H34OrderType.mjs";


const H34OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H34OrderType.options}
			getOptionLabel={H34OrderType.getOptionLabel}
			isOptionEqualToValue={H34OrderType.isOptionEqualToValue}
			findByInput={H34OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H34OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H34OrderTypePicker.displayName = "H34OrderTypePicker";
export default H34OrderTypePicker;



