import PropTypes from "prop-types";
import { forwardRef } from "react";
import { ControlledOptionPicker } from "@/shared-components/option-picker/ControlledOptionPicker";
import OptionPicker from "@/shared-components/option-picker/OptionPicker";
import { memo } from "react";
import TxtExport from "@/modules/md-txt-export";

const TxtExportOutputModePicker = memo(
	forwardRef((props, ref) => {
		const { name, readOnly = false, label = "輸出格式", ...rest } = props;

		if (name) {
			return (
				<ControlledOptionPicker
					name={name}
					readOnly={readOnly}
					label={label}
					options={TxtExport.options}
					getOptionLabel={TxtExport.getOptionLabel}
					isOptionEqualToValue={TxtExport.isOptionEqualToValue}
					{...rest}
				/>
			);
		} else {
			return (
				<OptionPicker
					readOnly={readOnly}
					ref={ref}
					label={label}
					options={TxtExport.options}
					getOptionLabel={TxtExport.getOptionLabel}
					isOptionEqualToValue={TxtExport.isOptionEqualToValue}
					{...rest}
				/>
			);
		}
	})
);

TxtExportOutputModePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
	readOnly: PropTypes.bool,
};

TxtExportOutputModePicker.displayName = "TxtExportOutputModePicker";
export default TxtExportOutputModePicker;
