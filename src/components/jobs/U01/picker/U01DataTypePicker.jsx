import U01 from "@/modules/md-u01";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const U01DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPickerWrapper
				name={name}
				label={label}
				options={U01.dataTypeOptions}
				getOptionLabel={U01.getOptionLabel}
				isOptionEqualToValue={U01.isOptionEqualToValue}
				{...rest}
			/>
		);
	})
);

U01DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

U01DataTypePicker.displayName = "U01DataTypePicker";
export default U01DataTypePicker;


