import AreaTypes from "@/modules/md-area-types";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";

const AreaTypePicker = forwardRef((props, ref) => {
	const { label = "地區", ...rest } = props;

	return (
		<OptionPickerWrapper
			ref={ref}
			label={label}
			options={AreaTypes.options}
			getOptionLabel={AreaTypes.getOptionLabel}
			isOptionEqualToValue={AreaTypes.isOptionEqualToValue}
			findByInput={AreaTypes.findByInput}
			notFoundText="地區 ${id} 不存在"
			blurToLookup
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
