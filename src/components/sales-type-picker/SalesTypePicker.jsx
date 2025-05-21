import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import SalesTypes from "./SalesTypes.mjs";

const SalesTypePicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPickerWrapper
				ref={ref}
				fullWidth
				options={SalesTypes.options}
				getOptionLabel={SalesTypes.getOptionLabel}
				isOptionEqualToValue={SalesTypes.isOptionEqualToValue}
				findByInput={SalesTypes.findOptionByInput}
				notFoundText="銷售類別 ${input} 不存在"
				placeholder="空白: 零售+批發"
				{...rest}
			/>
		);
	})
);

SalesTypePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

SalesTypePicker.displayName = "SalesTypePicker";
export default SalesTypePicker;
