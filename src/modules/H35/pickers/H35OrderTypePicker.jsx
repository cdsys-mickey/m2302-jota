import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H35OrderType from "./H35OrderType.mjs";


const H35OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H35OrderType.options}
			getOptionLabel={H35OrderType.getOptionLabel}
			isOptionEqualToValue={H35OrderType.isOptionEqualToValue}
			findByInput={H35OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H35OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H35OrderTypePicker.displayName = "H35OrderTypePicker";
export default H35OrderTypePicker;





