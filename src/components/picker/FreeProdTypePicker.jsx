import PropTypes from "prop-types";
import { forwardRef } from "react";
import FreeProdTypes from "@/modules/md-free-prod-types";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";

const FreeProdTypePicker = forwardRef((props, ref) => {
	const { label = "免費", ...rest } = props;

	return (
		<OptionPickerWrapper
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
