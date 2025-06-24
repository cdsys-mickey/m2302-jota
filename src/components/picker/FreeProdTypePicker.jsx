import PropTypes from "prop-types";
import { forwardRef } from "react";
import FreeProdTypes from "@/modules/md-free-prod-types";
import { OptionPicker } from "@/shared-components";
import Constants from "@/modules/md-constants";

const FreeProdTypePicker = forwardRef((props, ref) => {
	const { label = "試贈樣", ...rest } = props;

	return (
		<OptionPicker
			ref={ref}
			label={label}
			options={FreeProdTypes.options}
			getOptionLabel={FreeProdTypes.getOptionLabel}
			isOptionEqualToValue={FreeProdTypes.isOptionEqualToValue}
			findByInput={FreeProdTypes.findByInput}
			notFoundText="試贈樣 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
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
