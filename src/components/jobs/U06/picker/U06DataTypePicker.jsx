import U06 from "@/modules/md-u06";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const U06DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPickerWrapper
				name={name}
				label={label}
				options={U06.dataTypeOptions}
				getOptionLabel={U06.getOptionLabel}
				isOptionEqualToValue={U06.isOptionEqualToValue}
				{...rest}
			/>
		);
	})
);

U06DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

U06DataTypePicker.displayName = "U06DataTypePicker";
export default U06DataTypePicker;



