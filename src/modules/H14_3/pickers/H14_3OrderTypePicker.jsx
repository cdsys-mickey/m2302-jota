import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H14_3OrderType from "./H14_3OrderType.mjs";


const H14_3OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H14_3OrderType.options}
			getOptionLabel={H14_3OrderType.getOptionLabel}
			isOptionEqualToValue={H14_3OrderType.isOptionEqualToValue}
			findByInput={H14_3OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H14_3OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H14_3OrderTypePicker.displayName = "H141OrderTypePicker";
export default H14_3OrderTypePicker;



