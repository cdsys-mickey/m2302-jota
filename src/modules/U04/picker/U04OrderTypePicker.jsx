import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import U04OrderType from "./U04OrderType.mjs";


const U04OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={U04OrderType.options}
			getOptionLabel={U04OrderType.getOptionLabel}
			isOptionEqualToValue={U04OrderType.isOptionEqualToValue}
			findByInput={U04OrderType.findByInput}
			notFoundText="排序方式 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
U04OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

U04OrderTypePicker.displayName = "U04OrderTypePicker";
export default U04OrderTypePicker;
