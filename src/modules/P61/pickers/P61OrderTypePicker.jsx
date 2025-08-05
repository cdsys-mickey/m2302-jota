import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P61OrderType from "./P61OrderType.mjs";


const P61OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "明細型態", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P61OrderType.options}
			getOptionLabel={P61OrderType.getOptionLabel}
			isOptionEqualToValue={P61OrderType.isOptionEqualToValue}
			findByInput={P61OrderType.findByInput}
			notFoundText="明細型態 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P61OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P61OrderTypePicker.displayName = "P61OrderTypePicker";
export default P61OrderTypePicker;











