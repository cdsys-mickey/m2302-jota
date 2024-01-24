import PropTypes from "prop-types";
import { forwardRef } from "react";
import ProdTypeA from "../../modules/md-prod-type-a";
import { ControlledOptionPicker } from "../../shared-components/controlled/ControlledOptionPicker";
import OptionPicker from "../../shared-components/picker/OptionPicker";
import { memo } from "react";
import StdPrint from "../../modules/md-std-print";

const StdPrintOutputModePicker = memo(
	forwardRef((props, ref) => {
		const { name, readOnly = false, label = "輸出格式", ...rest } = props;

		if (name) {
			return (
				<ControlledOptionPicker
					name={name}
					readOnly={readOnly}
					label={label}
					options={StdPrint.options}
					getOptionLabel={StdPrint.getOptionLabel}
					isOptionEqualToValue={StdPrint.isOptionEqualToValue}
					{...rest}
				/>
			);
		} else {
			return (
				<OptionPicker
					readOnly={readOnly}
					ref={ref}
					label={label}
					options={StdPrint.options}
					getOptionLabel={StdPrint.getOptionLabel}
					isOptionEqualToValue={StdPrint.isOptionEqualToValue}
					{...rest}
				/>
			);
		}
	})
);

StdPrintOutputModePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
	readOnly: PropTypes.bool,
};

StdPrintOutputModePicker.displayName = "StdPrintOutputModePicker";
export default StdPrintOutputModePicker;
