import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H41OrderType from "./H41OrderType.mjs";


const H41OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H41OrderType.options}
			getOptionLabel={H41OrderType.getOptionLabel}
			isOptionEqualToValue={H41OrderType.isOptionEqualToValue}
			findByInput={H41OrderType.findByInput}
			notFoundText="排序方式 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H41OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H41OrderTypePicker.displayName = "H41OrderTypePicker";
export default H41OrderTypePicker;







