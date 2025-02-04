import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H08OrderType from "./H08OrderType.mjs";


const H08OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H08OrderType.options}
			getOptionLabel={H08OrderType.getOptionLabel}
			isOptionEqualToValue={H08OrderType.isOptionEqualToValue}
			findByInput={H08OrderType.findByInput}
			notFoundText="排序方式 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H08OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H08OrderTypePicker.displayName = "H08OrderTypePicker";
export default H08OrderTypePicker;

