import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H46OrderType from "./H46OrderType.mjs";


const H46OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H46OrderType.options}
			getOptionLabel={H46OrderType.getOptionLabel}
			isOptionEqualToValue={H46OrderType.isOptionEqualToValue}
			findByInput={H46OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H46OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H46OrderTypePicker.displayName = "H46OrderTypePicker";
export default H46OrderTypePicker;


