import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import StdPrint from "../../modules/md-std-print";
import { ControlledOptionPicker } from "../../shared-components/controlled/ControlledOptionPicker";

const StdPrintOutputModePicker = memo(
	forwardRef((props, ref) => {
		console.log("rendering StdPrintOutputModePicker");
		const { label = "輸出格式", ...rest } = props;

		return (
			<ControlledOptionPicker
				ref={ref}
				label={label}
				options={StdPrint.options}
				getOptionLabel={StdPrint.getOptionLabel}
				isOptionEqualToValue={StdPrint.isOptionEqualToValue}
				{...rest}
			/>
		);

		// if (name) {
		// 	return (
		// 		<ControlledOptionPicker
		// 			name={name}
		// 			readOnly={readOnly}
		// 			label={label}
		// 			options={StdPrint.options}
		// 			getOptionLabel={StdPrint.getOptionLabel}
		// 			isOptionEqualToValue={StdPrint.isOptionEqualToValue}
		// 			{...rest}
		// 		/>
		// 	);
		// } else {
		// 	return (
		// 		<OptionPicker
		// 			readOnly={readOnly}
		// 			ref={ref}
		// 			label={label}
		// 			options={StdPrint.options}
		// 			getOptionLabel={StdPrint.getOptionLabel}
		// 			isOptionEqualToValue={StdPrint.isOptionEqualToValue}
		// 			{...rest}
		// 		/>
		// 	);
		// }
	})
);

StdPrintOutputModePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

StdPrintOutputModePicker.displayName = "StdPrintOutputModePicker";
export default StdPrintOutputModePicker;
