import P04 from "@/modules/md-p04";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const P04DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPickerWrapper
				name={name}
				label={label}
				options={P04.dataTypeOptions}
				getOptionLabel={P04.getOptionLabel}
				isOptionEqualToValue={P04.isOptionEqualToValue}
				{...rest}
			/>
		);
	})
);

P04DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P04DataTypePicker.displayName = "P04DataTypePicker";
export default P04DataTypePicker;


