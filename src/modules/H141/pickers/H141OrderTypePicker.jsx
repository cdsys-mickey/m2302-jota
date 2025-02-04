import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H141OrderType from "./H141OrderType.mjs";


const H141OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H141OrderType.options}
			getOptionLabel={H141OrderType.getOptionLabel}
			isOptionEqualToValue={H141OrderType.isOptionEqualToValue}
			findByInput={H141OrderType.findByInput}
			notFoundText="排序方式 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H141OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H141OrderTypePicker.displayName = "H141OrderTypePicker";
export default H141OrderTypePicker;


