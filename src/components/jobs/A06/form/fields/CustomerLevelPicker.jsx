import CustomerLevels from "@/modules/md-customer-levels";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";

export const CustomerLevelPicker = forwardRef((props, ref) => {
	const { name, readOnly = false, label = "等級", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			readOnly={readOnly}
			ref={ref}
			label={label}
			options={CustomerLevels.options}
			getOptionLabel={CustomerLevels.getOptionLabel}
			isOptionEqualToValue={CustomerLevels.isOptionEqualToValue}
			findByInput={CustomerLevels.findByInput}
			notFoundText="等級 ${id} 不存在"
			{...rest} />
	);
});
CustomerLevelPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
	readOnly: PropTypes.bool,
};

CustomerLevelPicker.displayName =
	"CustomerLevelPicker";
