import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H52OrderType from "./H52OrderType.mjs";


const H52OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H52OrderType.options}
			getOptionLabel={H52OrderType.getOptionLabel}
			isOptionEqualToValue={H52OrderType.isOptionEqualToValue}
			findByInput={H52OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H52OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H52OrderTypePicker.displayName = "H52OrderTypePicker";
export default H52OrderTypePicker;








