import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import StdPrint from "@/modules/md-std-print";

const StdPrintOutputModePicker = memo(
	forwardRef((props, ref) => {
		console.log("rendering StdPrintOutputModePicker");
		const { label = "輸出格式", ...rest } = props;

		return (
			<OptionPickerWrapper
				ref={ref}
				label={label}
				options={StdPrint.options}
				getOptionLabel={StdPrint.getOptionLabel}
				isOptionEqualToValue={StdPrint.isOptionEqualToValue}
				{...rest}
			/>
		);
	})
);

StdPrintOutputModePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

StdPrintOutputModePicker.displayName = "StdPrintOutputModePicker";
export default StdPrintOutputModePicker;
