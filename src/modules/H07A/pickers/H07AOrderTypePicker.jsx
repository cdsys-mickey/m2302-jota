import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H07AOrderType from "./H07AOrderType.mjs";


const H07AOrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H07AOrderType.options}
			getOptionLabel={H07AOrderType.getOptionLabel}
			isOptionEqualToValue={H07AOrderType.isOptionEqualToValue}
			findByInput={H07AOrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H07AOrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H07AOrderTypePicker.displayName = "H07AOrderTypePicker";
export default H07AOrderTypePicker;


