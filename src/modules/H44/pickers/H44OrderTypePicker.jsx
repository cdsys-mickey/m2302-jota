import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H44OrderType from "./H44OrderType.mjs";


const H44OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H44OrderType.options}
			getOptionLabel={H44OrderType.getOptionLabel}
			isOptionEqualToValue={H44OrderType.isOptionEqualToValue}
			findByInput={H44OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H44OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H44OrderTypePicker.displayName = "H44OrderTypePicker";
export default H44OrderTypePicker;


