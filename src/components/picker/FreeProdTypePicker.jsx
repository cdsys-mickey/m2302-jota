import PropTypes from "prop-types";
import { forwardRef } from "react";
import OptionPicker from "@/shared-components/picker/OptionPicker";
import FreeProdTypes from "../../modules/md-free-prod-types";

const FreeProdTypePicker = forwardRef((props, ref) => {
	const { name, label = "免費", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={FreeProdTypes.options}
			getOptionLabel={FreeProdTypes.getOptionLabel}
			isOptionEqualToValue={FreeProdTypes.isOptionEqualToValue}
			{...rest}
		/>
	);
});
FreeProdTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

FreeProdTypePicker.displayName = "FreeProdTypePicker";
export default FreeProdTypePicker;
