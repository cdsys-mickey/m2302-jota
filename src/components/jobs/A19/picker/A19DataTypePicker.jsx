import A19 from "@/modules/A19";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const A19DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPickerWrapper
				name={name}
				label={label}
				options={A19.dataTypeOptions}
				getOptionLabel={A19.getOptionLabel}
				isOptionEqualToValue={A19.isOptionEqualToValue}
				{...rest}
			/>
		);
	})
);

A19DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

A19DataTypePicker.displayName = "A19DataTypePicker";
export default A19DataTypePicker;
