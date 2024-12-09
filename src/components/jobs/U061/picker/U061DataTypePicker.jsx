import U061 from "@/modules/md-u061";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const U061DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPickerWrapper
				name={name}
				label={label}
				options={U061.dataTypeOptions}
				getOptionLabel={U061.getOptionLabel}
				isOptionEqualToValue={U061.isOptionEqualToValue}
				{...rest}
			/>
		);
	})
);

U061DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

U061DataTypePicker.displayName = "U061DataTypePicker";
export default U061DataTypePicker;




