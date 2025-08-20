import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H31OrderType from "./H31OrderType.mjs";


const H31OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H31OrderType.options}
			getOptionLabel={H31OrderType.getOptionLabel}
			isOptionEqualToValue={H31OrderType.isOptionEqualToValue}
			findByInput={H31OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H31OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H31OrderTypePicker.displayName = "H31OrderTypePicker";
export default H31OrderTypePicker;



