import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H43OrderType from "./H43OrderType.mjs";


const H43OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H43OrderType.options}
			getOptionLabel={H43OrderType.getOptionLabel}
			isOptionEqualToValue={H43OrderType.isOptionEqualToValue}
			findByInput={H43OrderType.findByInput}
			notFoundText="排序方式 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H43OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H43OrderTypePicker.displayName = "H43OrderTypePicker";
export default H43OrderTypePicker;




