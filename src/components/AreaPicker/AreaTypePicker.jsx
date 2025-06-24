import PropTypes from "prop-types";
import { forwardRef } from "react";
import { OptionPicker } from "@/shared-components";
import Constants from "@/modules/md-constants";
import AreaTypes from "./AreaTypes.mjs";

const AreaTypePicker = forwardRef((props, ref) => {
	const { label = "地區", ...rest } = props;

	return (
		<OptionPicker
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
