import TxtExport from "@/modules/md-txt-export";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { OptionPicker } from "@/shared-components";

const TxtExportOutputModePicker = memo(
	forwardRef((props, ref) => {
		const { label = "輸出格式", ...rest } = props;

		return (
			<OptionPicker
				label={label}
				options={TxtExport.options}
				getOptionLabel={TxtExport.getOptionLabel}
				isOptionEqualToValue={TxtExport.isOptionEqualToValue}
				disableClearable
				{...rest}
			/>
		);
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
