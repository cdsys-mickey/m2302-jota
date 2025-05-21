import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H49OrderType from "./H49OrderType.mjs";


const H49OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H49OrderType.options}
			getOptionLabel={H49OrderType.getOptionLabel}
			isOptionEqualToValue={H49OrderType.isOptionEqualToValue}
			findByInput={H49OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H49OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H49OrderTypePicker.displayName = "H49OrderTypePicker";
export default H49OrderTypePicker;








