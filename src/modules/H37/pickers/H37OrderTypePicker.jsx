import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H37OrderType from "./H37OrderType.mjs";


const H37OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H37OrderType.options}
			getOptionLabel={H37OrderType.getOptionLabel}
			isOptionEqualToValue={H37OrderType.isOptionEqualToValue}
			findByInput={H37OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H37OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H37OrderTypePicker.displayName = "H37OrderTypePicker";
export default H37OrderTypePicker;

