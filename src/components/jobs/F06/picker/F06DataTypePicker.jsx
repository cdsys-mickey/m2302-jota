import F06 from "@/modules/md-f06";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const F06DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPickerWrapper
				name={name}
				label={label}
				options={F06.dataTypeOptions}
				getOptionLabel={F06.getOptionLabel}
				isOptionEqualToValue={F06.isOptionEqualToValue}
				{...rest}
			/>
		);
	})
);

F06DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

F06DataTypePicker.displayName = "F06DataTypePicker";
export default F06DataTypePicker;

