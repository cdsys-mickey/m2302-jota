import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H15CalType from "./H15CalType.mjs";



const H15CalTypePicker = forwardRef((props, ref) => {
	const { name, label = "百分率算法", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={H15CalType.options}
			getOptionLabel={H15CalType.getOptionLabel}
			isOptionEqualToValue={H15CalType.isOptionEqualToValue}
			findByInput={H15CalType.findByInput}
			notFoundText="百分率算法 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H15CalTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H15CalTypePicker.displayName = "H15CalTypePicker";
export default H15CalTypePicker;


