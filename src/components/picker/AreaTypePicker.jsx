import PropTypes from "prop-types";
import { forwardRef } from "react";
import OptionPicker from "@/shared-components/picker/OptionPicker";
import AreaTypes from "@/modules/md-area-types";

const AreaTypePicker = forwardRef((props, ref) => {
	const { name, label = "地區", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={AreaTypes.options}
			getOptionLabel={AreaTypes.getOptionLabel}
			isOptionEqualToValue={AreaTypes.isOptionEqualToValue}
			{...rest}
		/>
	);
});
AreaTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

AreaTypePicker.displayName = "AreaTypePicker";
export default AreaTypePicker;
