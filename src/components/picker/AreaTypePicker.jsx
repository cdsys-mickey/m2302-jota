import PropTypes from "prop-types";
import { forwardRef } from "react";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import Constants from "@/modules/md-constants";
import AreaTypes from "@/modules/AreaTypes.mjs";

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
			notFoundText="地區 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
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
