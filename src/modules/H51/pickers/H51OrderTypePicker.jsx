import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H51OrderType from "./H51OrderType.mjs";


const H51OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H51OrderType.options}
			getOptionLabel={H51OrderType.getOptionLabel}
			isOptionEqualToValue={H51OrderType.isOptionEqualToValue}
			findByInput={H51OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H51OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H51OrderTypePicker.displayName = "H51OrderTypePicker";
export default H51OrderTypePicker;



