import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H26OrderType from "./H26OrderType.mjs";


const H26OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H26OrderType.options}
			getOptionLabel={H26OrderType.getOptionLabel}
			isOptionEqualToValue={H26OrderType.isOptionEqualToValue}
			findByInput={H26OrderType.findByInput}
			notFoundText="排序方式 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H26OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H26OrderTypePicker.displayName = "H26OrderTypePicker";
export default H26OrderTypePicker;



