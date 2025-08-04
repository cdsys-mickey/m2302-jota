import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P54OrderTypes from "./P54OrderTypes.mjs";


const P54OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P54OrderTypes.options}
			getOptionLabel={P54OrderTypes.getOptionLabel}
			isOptionEqualToValue={P54OrderTypes.isOptionEqualToValue}
			findByInput={P54OrderTypes.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P54OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P54OrderTypePicker.displayName = "P54OrderTypePicker";
export default P54OrderTypePicker;











