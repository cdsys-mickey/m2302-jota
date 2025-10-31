import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import U01OrderType from "./U01OrderType.mjs";


const U01OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={U01OrderType.options}
			getOptionLabel={U01OrderType.getOptionLabel}
			isOptionEqualToValue={U01OrderType.isOptionEqualToValue}
			findByInput={U01OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
U01OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

U01OrderTypePicker.displayName = "U01OrderTypePicker";
export default U01OrderTypePicker;


