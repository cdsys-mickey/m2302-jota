import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P62OrderType from "./P62OrderType.mjs";


const P62OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P62OrderType.options}
			getOptionLabel={P62OrderType.getOptionLabel}
			isOptionEqualToValue={P62OrderType.isOptionEqualToValue}
			findByInput={P62OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P62OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P62OrderTypePicker.displayName = "P62OrderTypePicker";
export default P62OrderTypePicker;












