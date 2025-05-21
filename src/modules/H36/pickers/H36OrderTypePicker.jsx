import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H36OrderType from "./H36OrderType.mjs";


const H36OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H36OrderType.options}
			getOptionLabel={H36OrderType.getOptionLabel}
			isOptionEqualToValue={H36OrderType.isOptionEqualToValue}
			findByInput={H36OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H36OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H36OrderTypePicker.displayName = "H36OrderTypePicker";
export default H36OrderTypePicker;






