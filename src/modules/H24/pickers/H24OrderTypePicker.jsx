import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H24OrderType from "./H24OrderType.mjs";


const H24OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H24OrderType.options}
			getOptionLabel={H24OrderType.getOptionLabel}
			isOptionEqualToValue={H24OrderType.isOptionEqualToValue}
			findByInput={H24OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H24OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H24OrderTypePicker.displayName = "H24OrderTypePicker";
export default H24OrderTypePicker;
