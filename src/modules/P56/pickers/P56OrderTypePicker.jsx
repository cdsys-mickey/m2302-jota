import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P56OrderType from "./P56OrderType.mjs";


const P56OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P56OrderType.options}
			getOptionLabel={P56OrderType.getOptionLabel}
			isOptionEqualToValue={P56OrderType.isOptionEqualToValue}
			findByInput={P56OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P56OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P56OrderTypePicker.displayName = "P56OrderTypePicker";
export default P56OrderTypePicker;











