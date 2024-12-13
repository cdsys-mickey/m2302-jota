import F04 from "@/modules/md-f04";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const F04DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPickerWrapper
				name={name}
				label={label}
				options={F04.dataTypeOptions}
				getOptionLabel={F04.getOptionLabel}
				isOptionEqualToValue={F04.isOptionEqualToValue}
				{...rest}
			/>
		);
	})
);

F04DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

F04DataTypePicker.displayName = "F04DataTypePicker";
export default F04DataTypePicker;

