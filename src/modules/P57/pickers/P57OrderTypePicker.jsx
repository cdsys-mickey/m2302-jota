import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P57OrderType from "./P57OrderType.mjs";


const P57OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P57OrderType.options}
			getOptionLabel={P57OrderType.getOptionLabel}
			isOptionEqualToValue={P57OrderType.isOptionEqualToValue}
			findByInput={P57OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P57OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P57OrderTypePicker.displayName = "P57OrderTypePicker";
export default P57OrderTypePicker;











