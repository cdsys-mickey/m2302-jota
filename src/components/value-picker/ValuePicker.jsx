import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const ValuePicker = memo(
	forwardRef((props, ref) => {
		const { options, ...rest } = props;

		return (
			<OptionPickerWrapper
				ref={ref}
				fullWidth
				label=""
				options={options}
				// getOptionLabel={PrimitiveTypes.getOptionLabel}
				// isOptionEqualToValue={PrimitiveTypes.isOptionEqualToValue}
				// findByInput={PrimitiveTypes.findOptionByInput}
				// notFoundText="銷售類別 ${input} 不存在"
				// placeholder="Y:零售 N:批發, 空白: 零售+批發"
				{...rest}
			/>
		);
	})
);

ValuePicker.propTypes = {
	options: PropTypes.array,
	label: PropTypes.string,
	children: PropTypes.node,
};

ValuePicker.displayName = "ValuePicker";
export default ValuePicker;
