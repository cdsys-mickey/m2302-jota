import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import A19 from "@/modules/md-a19";
import { ControlledOptionPicker } from "@/shared-components/controlled/ControlledOptionPicker";
import OptionPicker from "@/shared-components/picker/OptionPicker";

const A19DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		if (name) {
			return (
				<ControlledOptionPicker
					name={name}
					label={label}
					options={A19.dataTypeOptions}
					getOptionLabel={A19.getOptionLabel}
					isOptionEqualToValue={A19.isOptionEqualToValue}
					{...rest}
				/>
			);
		} else {
			return (
				<OptionPicker
					ref={ref}
					label={label}
					options={A19.dataTypeOptions}
					getOptionLabel={A19.getOptionLabel}
					isOptionEqualToValue={A19.isOptionEqualToValue}
					{...rest}
				/>
			);
		}
	})
);

A19DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

A19DataTypePicker.displayName = "A19DataTypePicker";
export default A19DataTypePicker;
