import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H53OrderType from "./H53OrderType.mjs";


const H53OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H53OrderType.options}
			getOptionLabel={H53OrderType.getOptionLabel}
			isOptionEqualToValue={H53OrderType.isOptionEqualToValue}
			findByInput={H53OrderType.findByInput}
			notFoundText="排序方式 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H53OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H53OrderTypePicker.displayName = "H53OrderTypePicker";
export default H53OrderTypePicker;









