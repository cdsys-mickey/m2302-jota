import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H15OrderType from "./H15OrderType.mjs";


const H15OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H15OrderType.options}
			getOptionLabel={H15OrderType.getOptionLabel}
			isOptionEqualToValue={H15OrderType.isOptionEqualToValue}
			findByInput={H15OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H15OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H15OrderTypePicker.displayName = "H15OrderTypePicker";
export default H15OrderTypePicker;


