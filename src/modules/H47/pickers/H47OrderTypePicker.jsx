import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H47OrderType from "./H47OrderType.mjs";


const H47OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H47OrderType.options}
			getOptionLabel={H47OrderType.getOptionLabel}
			isOptionEqualToValue={H47OrderType.isOptionEqualToValue}
			findByInput={H47OrderType.findByInput}
			notFoundText="排序方式 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H47OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H47OrderTypePicker.displayName = "H47OrderTypePicker";
export default H47OrderTypePicker;



