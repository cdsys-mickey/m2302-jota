import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H07OrderType from "./H07OrderType.mjs";


const H07OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H07OrderType.options}
			getOptionLabel={H07OrderType.getOptionLabel}
			isOptionEqualToValue={H07OrderType.isOptionEqualToValue}
			findByInput={H07OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H07OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H07OrderTypePicker.displayName = "H07OrderTypePicker";
export default H07OrderTypePicker;

