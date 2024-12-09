import P02 from "@/modules/md-p02";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const P02DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPickerWrapper
				name={name}
				label={label}
				options={P02.dataTypeOptions}
				getOptionLabel={P02.getOptionLabel}
				isOptionEqualToValue={P02.isOptionEqualToValue}
				{...rest}
			/>
		);
	})
);

P02DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P02DataTypePicker.displayName = "P02DataTypePicker";
export default P02DataTypePicker;

