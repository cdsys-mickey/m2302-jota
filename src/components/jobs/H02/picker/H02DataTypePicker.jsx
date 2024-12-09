import H02 from "@/modules/md-h02";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const H02DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPickerWrapper
				name={name}
				label={label}
				options={H02.dataTypeOptions}
				getOptionLabel={H02.getOptionLabel}
				isOptionEqualToValue={H02.isOptionEqualToValue}
				{...rest}
			/>
		);
	})
);

H02DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H02DataTypePicker.displayName = "H02DataTypePicker";
export default H02DataTypePicker;



