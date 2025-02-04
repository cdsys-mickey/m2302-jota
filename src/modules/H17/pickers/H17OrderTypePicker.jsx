import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H17OrderType from "./H17OrderType.mjs";


const H17OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H17OrderType.options}
			getOptionLabel={H17OrderType.getOptionLabel}
			isOptionEqualToValue={H17OrderType.isOptionEqualToValue}
			findByInput={H17OrderType.findByInput}
			notFoundText="排序方式 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H17OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H17OrderTypePicker.displayName = "H17OrderTypePicker";
export default H17OrderTypePicker;


