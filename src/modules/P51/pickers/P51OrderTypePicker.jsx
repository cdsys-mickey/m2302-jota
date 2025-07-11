import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P51OrderType from "./P51OrderType.mjs";


const P51OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P51OrderType.options}
			getOptionLabel={P51OrderType.getOptionLabel}
			isOptionEqualToValue={P51OrderType.isOptionEqualToValue}
			findByInput={P51OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P51OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P51OrderTypePicker.displayName = "P51OrderTypePicker";
export default P51OrderTypePicker;









