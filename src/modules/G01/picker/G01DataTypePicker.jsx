import G01 from "@/modules/G01/G01.mjs";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const G01DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPickerWrapper
				name={name}
				label={label}
				options={G01.dataTypeOptions}
				getOptionLabel={G01.getOptionLabel}
				isOptionEqualToValue={G01.isOptionEqualToValue}
				{...rest}
			/>
		);
	})
);

G01DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

G01DataTypePicker.displayName = "G01DataTypePicker";
export default G01DataTypePicker;




