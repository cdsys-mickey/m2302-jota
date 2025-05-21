import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H06OrderType from "./H06OrderType.mjs";


const H06OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H06OrderType.options}
			getOptionLabel={H06OrderType.getOptionLabel}
			isOptionEqualToValue={H06OrderType.isOptionEqualToValue}
			findByInput={H06OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H06OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H06OrderTypePicker.displayName = "H06OrderTypePicker";
export default H06OrderTypePicker;



