import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H38OrderType from "./H38OrderType.mjs";


const H38OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H38OrderType.options}
			getOptionLabel={H38OrderType.getOptionLabel}
			isOptionEqualToValue={H38OrderType.isOptionEqualToValue}
			findByInput={H38OrderType.findByInput}
			notFoundText="排序方式 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H38OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H38OrderTypePicker.displayName = "H38OrderTypePicker";
export default H38OrderTypePicker;







