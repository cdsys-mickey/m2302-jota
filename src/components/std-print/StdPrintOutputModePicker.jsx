import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import StdPrint from "@/modules/StdPrint.mjs";

const StdPrintOutputModePicker = memo(
	forwardRef((props, ref) => {
		const { label = "輸出格式", ...rest } = props;

		return (
			<OptionPicker
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
