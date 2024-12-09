import H01 from "@/modules/md-h01";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const H01DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPickerWrapper
				name={name}
				label={label}
				options={H01.dataTypeOptions}
				getOptionLabel={H01.getOptionLabel}
				isOptionEqualToValue={H01.isOptionEqualToValue}
				{...rest}
			/>
		);
	})
);

H01DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H01DataTypePicker.displayName = "H01DataTypePicker";
export default H01DataTypePicker;


