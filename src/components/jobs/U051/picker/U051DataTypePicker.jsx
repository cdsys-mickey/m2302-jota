import U051 from "@/modules/md-u051";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const U051DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPickerWrapper
				name={name}
				label={label}
				options={U051.dataTypeOptions}
				getOptionLabel={U051.getOptionLabel}
				isOptionEqualToValue={U051.isOptionEqualToValue}
				{...rest}
			/>
		);
	})
);

U051DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

U051DataTypePicker.displayName = "U051DataTypePicker";
export default U051DataTypePicker;



