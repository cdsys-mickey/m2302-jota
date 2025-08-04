import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P55OrderType from "./P55OrderType.mjs";


const P55OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P55OrderType.options}
			getOptionLabel={P55OrderType.getOptionLabel}
			isOptionEqualToValue={P55OrderType.isOptionEqualToValue}
			findByInput={P55OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P55OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P55OrderTypePicker.displayName = "P55OrderTypePicker";
export default P55OrderTypePicker;











