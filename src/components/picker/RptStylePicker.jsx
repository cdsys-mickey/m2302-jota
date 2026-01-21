import Constants from "@/modules/md-constants";
import RptStyles from "@/modules/RptStyles.mjs";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const RptStylePicker = forwardRef((props, ref) => {
	const { name, label = "順序", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={RptStyles.options}
			getOptionLabel={RptStyles.getOptionLabel}
			isOptionEqualToValue={RptStyles.isOptionEqualToValue}
			findByInput={RptStyles.findByInput}
			notFoundText="樣式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
RptStylePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

RptStylePicker.displayName = "RptStylePicker";
export default RptStylePicker;
