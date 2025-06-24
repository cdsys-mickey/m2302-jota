import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H42OrderType from "./H42OrderType.mjs";


const H42OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H42OrderType.options}
			getOptionLabel={H42OrderType.getOptionLabel}
			isOptionEqualToValue={H42OrderType.isOptionEqualToValue}
			findByInput={H42OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H42OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H42OrderTypePicker.displayName = "H42OrderTypePicker";
export default H42OrderTypePicker;



