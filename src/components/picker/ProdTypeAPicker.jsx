import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import ProdTypeA from "@/modules/ProdTypeA";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import Constants from "@/modules/md-constants";

const ProdTypeAPicker = memo(forwardRef((props, ref) => {
	const { label = "品別", ...rest } = props;

	return (
		<OptionPickerWrapper
			ref={ref}
			label={label}
			options={ProdTypeA.options}
			getOptionLabel={ProdTypeA.getOptionLabel}
			isOptionEqualToValue={ProdTypeA.isOptionEqualToValue}
			findByInput={ProdTypeA.findByInput}
			notFoundText="品別代號 ${input} 不存在"
			// blurToLookup
			{...rest}
			{...Constants.STATIC_PICKER_OPTS}
		/>
	);
}));

ProdTypeAPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
	readOnly: PropTypes.bool,
};

ProdTypeAPicker.displayName = "ProdTypeAPicker";
export default ProdTypeAPicker;
