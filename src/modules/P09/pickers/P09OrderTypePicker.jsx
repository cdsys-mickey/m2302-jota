import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P09OrderType from "./P09OrderType.mjs";


const P09OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={P09OrderType.options}
			getOptionLabel={P09OrderType.getOptionLabel}
			isOptionEqualToValue={P09OrderType.isOptionEqualToValue}
			findByInput={P09OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P09OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P09OrderTypePicker.displayName = "P09OrderTypePicker";
export default P09OrderTypePicker;



