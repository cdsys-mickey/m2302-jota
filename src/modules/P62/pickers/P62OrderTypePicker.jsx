import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P62OrderTypes from "./P62OrderTypes.mjs";


const P62OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "明細型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P62OrderTypes.options}
			getOptionLabel={P62OrderTypes.getOptionLabel}
			isOptionEqualToValue={P62OrderTypes.isOptionEqualToValue}
			findByInput={P62OrderTypes.findByInput}
			notFoundText="明細型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P62OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P62OrderTypePicker.displayName = "P62OrderTypePicker";
export default P62OrderTypePicker;












