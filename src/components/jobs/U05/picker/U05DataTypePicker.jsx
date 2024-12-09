import U05 from "@/modules/md-u05";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const U05DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPickerWrapper
				name={name}
				label={label}
				options={U05.dataTypeOptions}
				getOptionLabel={U05.getOptionLabel}
				isOptionEqualToValue={U05.isOptionEqualToValue}
				{...rest}
			/>
		);
	})
);

U05DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

U05DataTypePicker.displayName = "U05DataTypePicker";
export default U05DataTypePicker;


