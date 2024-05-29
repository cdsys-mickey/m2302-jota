import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import Database from "@/modules/md-database";
import { ControlledOptionPicker } from "@/shared-components/option-picker/ControlledOptionPicker";
import OptionPicker from "@/shared-components/option-picker/OptionPicker";

const DbTablePicker = memo(
	forwardRef((props, ref) => {
		const { name, readOnly = false, label = "主檔", ...rest } = props;

		if (name) {
			return (
				<ControlledOptionPicker
					name={name}
					readOnly={readOnly}
					label={label}
					options={Database.TABLES}
					getOptionLabel={Database.getOptionLabel}
					isOptionEqualToValue={Database.isOptionEqualToValue}
					{...rest}
				/>
			);
		} else {
			return (
				<OptionPicker
					readOnly={readOnly}
					ref={ref}
					label={label}
					options={Database.TABLES}
					getOptionLabel={Database.getOptionLabel}
					isOptionEqualToValue={Database.isOptionEqualToValue}
					{...rest}
				/>
			);
		}
	})
);

DbTablePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
	readOnly: PropTypes.bool,
};

DbTablePicker.displayName = "DbTablePicker";
export default DbTablePicker;
