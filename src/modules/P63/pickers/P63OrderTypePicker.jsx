import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P63OrderTypes from "./P63OrderTypes.mjs";


const P63OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "明細型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P63OrderTypes.options}
			getOptionLabel={P63OrderTypes.getOptionLabel}
			isOptionEqualToValue={P63OrderTypes.isOptionEqualToValue}
			findByInput={P63OrderTypes.findByInput}
			notFoundText="明細型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P63OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P63OrderTypePicker.displayName = "P63OrderTypePicker";
export default P63OrderTypePicker;












